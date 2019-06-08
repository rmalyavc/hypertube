import { Injectable } from '@angular/core';
import { ISearchResult } from './SearchResult';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  	providedIn: 'root'
})
export class FilmService {
	private _url: string = '';

  	constructor(private http: HttpClient) { }

  	get_film(film_id) {
  		this._url = 'https://yts.lt/api/v2/movie_details.json?movie_id=' + film_id;
  		console.log(this._url);
  		return this.http.get<ISearchResult>(this._url);
  	}
}
