import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
	protected base_url: string = '';
	protected _url: string = '';

	constructor() {
		this.base_url = 'https://768b1cb6.ngrok.io/';
	}

	get_base_url() {
		return this.base_url;
	}
}