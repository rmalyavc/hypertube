import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
	protected base_url: string = '';
	protected _url: string = '';

	constructor() {
		this.base_url = 'http://localhost:8000/';
	}

	get_base_url() {
		return this.base_url;
	}
}
