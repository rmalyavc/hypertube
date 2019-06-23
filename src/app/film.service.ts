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

  	constructor(private http: HttpClient) { }

  	get_film(film_id) {
  		this._url = 'https://yts.lt/api/v2/movie_details.json?movie_id=' + film_id;
  		return this.http.get<ISearchResult>(this._url);
  	}

  	get_comments(film_id) {
  		this._url = 'https://yts.lt/api/v2/movie_comments.json?movie_id=' + film_id;
  		return this.http.get<ISearchResult>(this._url);
  	}

    save_visit(movie, current_user) {
      this._url = 'https://5c6bf299.ngrok.io/user/history/addMovie';
      
      var query_part = {
        movie_id: movie.id,
        name: movie.name,
        img: movie.img,
        uid: current_user.id,
        token: 'test_token'
      };
      return this.http.post<IResult>(this._url, query_part);
    }

    get_history(user_id, limit: number = 20) {
      this._url = 'https://5c6bf299.ngrok.io/user/history/movies/' + limit + '?uid=' + user_id;
      return this.http.get<ISearchResult>(this._url);
    }
}
