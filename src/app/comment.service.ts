import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResult } from './Result';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
	private _url: string = '';

	constructor(private http: HttpClient) {

	}

	get_base_url() {
		return 'https://9587c19d.ngrok.io//';
		// return '/assets/data/user_suggests/users.json';
	}

	get_suggests(current_user, search) {
		this._url = this.get_base_url() + 'user/suggest_login?token=' + current_user.token + '&login=' + search;
		// this._url = '/assets/data/user_suggests/users.json';
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
        console.log(params);
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

    get_comments(current_user, movie_id: string, limit: number = 10, skip: number = 0) {
  		this._url = this.get_base_url() + '/movie/get/comments';
        this._url += '?token=' + current_user.token + '&record_id=' + movie_id + '&limit=' + limit + '&skip=' + skip;
  		return this.http.get<IResult>(this._url);
  	}
}
