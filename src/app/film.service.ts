import { Injectable } from '@angular/core';
import { IFilm } from './Film';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  	providedIn: 'root'
})
export class FilmService {
	private _url: string = '';

  	constructor(private http: HttpClient) { }

  	get_film(film_id) {
  		this._url = '/assets/data/films/' + film_id + ".json";
  		return this.http.get<IFilm>(this._url);
  	}
}
