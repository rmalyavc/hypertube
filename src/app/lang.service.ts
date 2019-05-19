import { Injectable } from '@angular/core';
import { ILang } from './Lang';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LangService {
	private _url: string;

	constructor(private http: HttpClient) { }

	get_labels(lang = 'EN') {
		this._url = '/assets/data/' + lang + '.json';
		return this.http.get<ILang>(this._url);
	}
}
