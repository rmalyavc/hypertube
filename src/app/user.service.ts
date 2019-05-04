import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	public current_user = null;

	constructor() { }

	get_current_user() {
		console.log('User Service Log');
		console.log(this.current_user);
		if (this.current_user !== null)
			return this.current_user;
		return Math.random() * 100 < 50 ? false : {
			id: '42',
			login: 'rmalyavc',
			first_name: 'Roman',
			last_name: 'Malyavchik',
			age: '30',
		}
	}
}
