import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	// public current_user = null;

	constructor() { }

	get_current_user(logged_out = false) {
		if (logged_out)
			return false;
		return {
			id: '42',
			login: 'rmalyavc',
			first_name: 'Roman',
			last_name: 'Malyavchik',
			age: '30',
		}
	}
}
