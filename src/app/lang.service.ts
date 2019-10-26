import { Injectable } from '@angular/core';
import { ILang } from './Lang';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class LangService extends BaseService {
	constructor(private http: HttpClient) {
		super();
	}

	get_labels(lang = 'EN', component = 'application') {
		var file =  `${component}/${lang}.json`;
		this._url = `/assets/data/language/${file}`;
		return this.http.get(this._url);
	}
}
