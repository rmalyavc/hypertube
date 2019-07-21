import { Injectable } from '@angular/core';
import { ILang } from './Lang';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LangService {
	private _url: string;

	constructor(private http: HttpClient) { }

	get_labels(lang = 'EN', component = 'application') {
		var file = component + '/' + lang + '.json';
		this._url = '/assets/data/language/' + file;
		return this.http.get<ILang>(this._url);
	}
}
