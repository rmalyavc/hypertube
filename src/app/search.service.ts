import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ISearchResult } from './SearchResult';

@Injectable({
	providedIn: 'root'
})
export class SearchService {
	private _url: string = '';

	constructor(private http: HttpClient) { }

	get_results(filters: any = false) {
		var query_part = '';
		if (filters.video) {
			query_part = '?genre[]='
			var keys = Object.keys(filters.video);
			for (var i = 0; i < keys.length; i++) {
				if (filters.video[keys[i]] == true)
					query_part += keys[i];
				if (i < keys.length - 1 && filters.video[keys[i + 1]] == true)
					query_part += ',';
			}
		}
		this._url = 'https://yts.lt/api/v2/list_movies.json' + query_part;
		console.log(this._url);
		return this.http.get<ISearchResult>(this._url);
	}
}
