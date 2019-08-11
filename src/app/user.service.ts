import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from './User';
import { IResult } from './Result';
import { IToken } from './Token';
import { Observable } from 'rxjs';

@Injectable({
  	providedIn: 'root'
})
export class UserService {
	private _url: string;

	constructor(private http: HttpClient) { }

	get_base_url() {
		return 'https://3e673b44.ngrok.io/';
	}

	get_current_user(logged_out = false): Observable<IUser> {
		this._url = '/assets/data/user.json';
		return this.http.get<IUser>(this._url);
	}

	register_user(form_data) {
		this._url = this.get_base_url() + 'register';
		return this.http.post<IResult>(this._url, form_data);
	}

	complete_registration(token) {
		this._url = this.get_base_url() + 'user/verify/' + token;
		return this.http.get<IResult>(this._url);
	}

	login_user(user_data) {
		this._url = this.get_base_url() + 'login';
		return this.http.post<IResult>(this._url, user_data);
	}

	logout_user(current_user) {
		this._url = this.get_base_url() + 'logout?token=' + current_user.token;
		return this.http.get<IResult>(this._url);
	}

	get_user_profile(user_id, current_user) {
		this._url = this.get_base_url() + 'user/profile' + '?uid=' + user_id + '&token=' + current_user.token;
		return this.http.get<IResult>(this._url);
	}

	is_logged_in(current_user) {
		this._url = this.get_base_url() + 'getUserStatus?' + 'uid=' + current_user.id + '&token=' + current_user.token;		
		return this.http.get<IResult>(this._url);
	}

	update_user(form_data) {
		this._url = this.get_base_url() + 'user/update';
		return this.http.post<IResult>(this._url, form_data);
	}

	change_password(form_data) {
		this._url = this.get_base_url() + 'user/password/' + form_data.action;
		console.log(this._url);
		console.log(form_data);
		return this.http.post<IResult>(this._url, form_data);
	}
	// get_csrf() {
	// 	this._url = 'http://84087a29.ngrok.io/app/token';
	// 	return this.http.get<IToken>(this._url);
	// }
}
