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
		return '/assets/data/user_suggests/users.json';
	}

	get_suggests() {
		this._url = this.get_base_url();
		return this.http.get<IResult>(this._url);
	}
}
