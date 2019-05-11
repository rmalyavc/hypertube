import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from './User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	private _url: string;

	constructor(private http: HttpClient) { }

	get_current_user(logged_out = false): Observable<IUser> {
		this._url = '/assets/data/user.json';
		// if (logged_out)
		// 	return false;
		// return {
		// 	id: '42',
		// 	login: 'rmalyavc',
		// 	first_name: 'Roman',
		// 	last_name: 'Malyavchik',
		// 	age: '30',
		// }
		return this.http.get<IUser>(this._url);
	}
}
