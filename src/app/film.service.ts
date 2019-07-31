import { Injectable } from '@angular/core';
import { ISearchResult } from './SearchResult';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IResult } from './Result';

@Injectable({
  	providedIn: 'root'
})
export class FilmService {
	private _url: string = '';
    public movie_db_url = 'https://api.themoviedb.org/3/';
    public api_key = '412d472aa9ed6eec7376bf00249e3b0a';
    public config: any = {};
    private access_token: string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTJkNDcyYWE5ZWQ2ZWVjNzM3NmJmMDAyNDllM2IwYSIsInN1YiI6IjVkMzllYWU3NjBjNTFkMjAxNTgyMTlkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bi-ooSJ99qDJn7kKsTabhwsfPsT4lgAhZfJCBmI5LNw';
    public genre_list: any = {};
    public lang: string = 'EN';

  	constructor(private http: HttpClient) {
        this._url = this.movie_db_url + 'configuration?api_key=' + this.api_key;
        this.http.get(this._url).subscribe(res => {
            this.config = res;
        });
        var current_user = JSON.parse(localStorage.getItem('current_user') || 'false');
        if (current_user)
            this.lang = current_user.lang;
        this._url = this.movie_db_url + 'genre/movie/list?api_key=' + this.api_key + '&language=' + this.lang;
        this.http.get(this._url).subscribe(res => {
            console.log(res);
            if (res['genres'] && res['genres'].length > 0) {
                for (var i = 0; i < res['genres'].length; i++) {
                    var genre = res['genres'][i];
                    this.genre_list[genre.id] = genre.name;
                }
            }
        });
    }

    get_base_url() {
        return 'https://8f0fd646.ngrok.io/';
    }

  	get_film(film_id) {
  		// this._url = 'https://yts.lt/api/v2/movie_details.json?movie_id=' + film_id;
        this._url = this.movie_db_url + 'movie/' + film_id + '?api_key=' + this.api_key + '&language=' + this.lang;
  		return this.http.get(this._url);
  	}

  	get_comments(current_user, movie_id: string, limit: number = 10, skip: number = 0) {
  		this._url = this.get_base_url() + '/movie/get/comments';
        this._url += '?token=' + current_user.token + '&record_id=' + movie_id + '&limit=' + limit + '&skip=' + skip;
  		return this.http.get<IResult>(this._url);
  	}

    save_visit(movie, current_user) {
        this._url = this.get_base_url() + '/user/history/addMovie';

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
       
        this._url = this.get_base_url() + '/user/history/movies?limit=' + limit + '&uid=' + page_user.uid + '&token=' + current_user.token + '&skip=' + skip + '&order_by=' + order_by + '&sort_order=' + sort_order;
        return this.http.get<IResult>(this._url);
    }

    post_comment(current_user, movie_id, value) {
        this._url = this.get_base_url() + '/movie/set/comment';
        var params = {
            uid: current_user.uid,
            token: current_user.token,
            record_id: movie_id,
            comment: value,
        };
        return this.http.post<IResult>(this._url, params);
    }

    update_comment(current_user, current_comment) {
        this._url = this.get_base_url() + '/movie/edit/comment';
        var params = {
            uid: current_user.uid,
            token: current_user.token,
            id: current_comment.id,
            comment: current_comment.comment
        };
        return this.http.post<IResult>(this._url, params);
    }

    delete_comment(current_user, current_comment) {
        this._url = this.get_base_url() + '/movie/delete/comment';
        var params = {
            uid: current_user.uid,
            token: current_user.token,
            id: current_comment.id
        };
        return this.http.post<IResult>(this._url, params);
    }

    search_movies(search_data: any = false, page = 1) {
        this._url = this.movie_db_url;
        var query_part = '?api_key=' + this.api_key;
        var method = 'discover';
        if (search_data) {
            query_part += '&query=' + search_data.search_string;
            if (search_data.search_string != '')
                method = 'search';
            for (var i = 0; i < search_data.keys.length; i++) {
                var key = search_data.keys[i];
                if (key == 'sort_by' && search_data.filters.sort_by &&
                    search_data.filters.sort_by != '' && search_data.filters.order_by &&
                    search_data.filters.order_by != '') {
                    search_data.filters.sort_by = search_data.filters.sort_by.replace('.asc', '').replace('.desc', '') + '.' + search_data.filters.order_by;
                }

                if (key != 'order_by' && search_data.filters[key] && search_data.filters[key] != '')
                    query_part += '&' + key + '=' + search_data.filters[key];
            }
        }
        query_part += '&page=' + page;
        // query_part += '&language=' + this.lang;
        this._url += method + '/movie' + query_part;
        return this.http.get<ISearchResult>(this._url);
    }
}
