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

	get_current_user(logged_out = false): Observable<IUser> {
		this._url = '/assets/data/user.json';
		return this.http.get<IUser>(this._url);
	}

	register_user(form_data) {
		this._url = 'http://26f97791.ngrok.io/register';
		return this.http.post<IResult>(this._url, form_data);
	}

	login_user(user_data) {
		this._url = 'http://84087a29.ngrok.io/test';
		return this.http.post<IUser>(this._url, user_data);
	}

	get_csrf() {
		this._url = 'http://84087a29.ngrok.io/app/token';
		return this.http.get<IToken>(this._url);
	}
}
