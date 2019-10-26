import { Injectable } from '@angular/core';
import { ISearchResult } from './SearchResult';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IResult } from './Result';
import { BaseService } from './base.service';

@Injectable({
  	providedIn: 'root'
})
export class FilmService extends BaseService {
    public movie_db_url = 'https://api.themoviedb.org/3/';
    public api_key = '412d472aa9ed6eec7376bf00249e3b0a';
    public config: any = {};
    private access_token: string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTJkNDcyYWE5ZWQ2ZWVjNzM3NmJmMDAyNDllM2IwYSIsInN1YiI6IjVkMzllYWU3NjBjNTFkMjAxNTgyMTlkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bi-ooSJ99qDJn7kKsTabhwsfPsT4lgAhZfJCBmI5LNw';
    public genre_list: any = {};
    public lang: string = 'EN';

  	constructor(private http: HttpClient) {
        super();
        this._url = `${this.movie_db_url}configuration?api_key=${this.api_key}`;
        this.http.get(this._url).subscribe(res => {
            this.config = res;
            var lang = localStorage.getItem('page_lang');
            this.lang = lang || this.lang;
            this._url = `${this.movie_db_url}genre/movie/list?api_key=${this.api_key}&language=${this.lang}`;
            this.http.get(this._url).subscribe(g_res => {
                if (g_res['genres'] && g_res['genres'].length > 0) {
                    for (var i = 0; i < g_res['genres'].length; i++) {
                        var genre = g_res['genres'][i];
                        this.genre_list[genre.id] = genre.name;
                    }
                }
            });
        });
    }

  	get_film(film_id) {
        this._url = `${this.movie_db_url}movie/${film_id}?api_key=${this.api_key}&language=${this.lang}&append_to_response=videos`;
  		return this.http.get(this._url);
  	}

    get_torrent(imdb) {
        this._url = `https://yts.lt/api/v2/list_movies.json?query_term=${imdb}`;
        return this.http.get(this._url);
    }
    get_video(movie_id, hash = '') {
        this._url = `http://localhost:3000/get_video?movie_id=${movie_id}&hash=${hash}`;
        return this.http.get<IResult>(this._url);
    }
    get_subtitles(lang, path, imdb, movie_id) {
        this._url = `http://localhost:3000/get_subtitles?lang=${lang}&path=${path}&imdb=${imdb}&movie_id=${movie_id}`;
        return this.http.get<IResult>(this._url);
    }
    check_percentage(movie_id) {
        this._url = `http://localhost:3000/check_percentage?movie_id=${movie_id}`;
        return this.http.get<IResult>(this._url);
    }

    save_visit(movie, current_user) {
        this._url = `${this.base_url}user/history/addMovie`;

        var query_part = {
            movie_id: movie.id,
            name: movie.name,
            img: movie.img,
            uid: current_user.uid,
            token: current_user.token
        };
        return this.http.post<IResult>(this._url, query_part);
    }

    get_history(page_user, current_user, limit: number = 20, skip: number = 0, order_by: string = 'updated_at', sort_order: string = 'DESC') {
       
        this._url = `${this.base_url}user/history/movies?limit=${limit}&uid=${page_user.uid}&token=${current_user.token}&skip=${skip}&order_by=${order_by}&sort_order=${sort_order}`;
        return this.http.get<IResult>(this._url);
    }

    search_movies(search_data: any = false, page = 1) {
        this._url = this.movie_db_url;
        var query_part = `?api_key=${this.api_key}`;
        var method = 'discover';
        if (search_data.keys || search_data.search_string) {
            query_part += `&query=${search_data.search_string}`;
            if (search_data.search_string != '')
                method = 'search';
            if (search_data.keys) {
                for (var i = 0; i < search_data.keys.length; i++) {
                    var key = search_data.keys[i];
                    if (key == 'sort_by' && search_data.filters.sort_by && search_data.filters.order_by) {
                        search_data.filters.sort_by = search_data.filters.sort_by.replace('.asc', '').replace('.desc', '') + '.' + search_data.filters.order_by;
                    }
                    if (key != 'order_by' && search_data.filters[key]) {
                        query_part += `&${key}=`;
                        if (key != 'with_genres') {
                            query_part += search_data.filters[key];
                        }
                        else {
                            var genres = [];
                            for (var j = 0; search_data.filters[key][j]; j++) {
                                genres.push(search_data.filters[key][j].item_id);
                            }
                            query_part += genres.join();
                        }
                    }
                }
            }
        }
        query_part += `&page=${page}&language=` + this.lang.toLowerCase();
        this._url += `${method}/movie${query_part}`;
        return this.http.get<ISearchResult>(this._url);
    }
}
