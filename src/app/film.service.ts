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

    get_base_url() {
      return 'https://a0b6f8b5.ngrok.io';
    }

  	get_film(film_id) {
  		this._url = 'https://yts.lt/api/v2/movie_details.json?movie_id=' + film_id;
  		return this.http.get<ISearchResult>(this._url);
  	}

  	get_comments(current_user, movie_id: string, limit: number = 10, skip: number = 0) {
  		this._url = this.get_base_url() + '/movie/get/comments';
      this._url += '?token=' + current_user.token + '&record_id=' + movie_id + '&limit=' + limit + '&skip=' + skip;
      console.log(this._url);
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
      console.log(this._url);
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
}
