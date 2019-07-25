import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SearchService } from '../search.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { LangService } from '../lang.service';
import { FilmService } from '../film.service';
import { ISearchResult } from '../SearchResult';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Subject } from 'rxjs';

declare var require: any;

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent extends BaseComponent implements OnInit {
	@Input() load_more: Subject<boolean>;
	private search_data: any = {};
	private filts: any = {};
	public results: any = false;
	public _url: string = '';
	private page: number = 1;
	private limit: number = 20;
	private no_img: string = require('./assets/no_image.png');

	constructor(private http: HttpClient, public user_service: UserService, public router: Router, public route: ActivatedRoute, public lang_service: LangService, public search_service: SearchService, public film_service: FilmService) {
		super(user_service, router, route, lang_service);
	}

	ngOnInit() {
		// this.film_service.get_movie_config();
		this.get_mod_strings('SearchComponent');
		this.load_more.subscribe(v => {
			this.get_results().subscribe(results => {
				console.log(results);
				if (results.results) {
					// this.results.data.movie_count += results.data.movies.length;
					for (var i = 0; i < results.results.length; i++) {
						if (results.results[i].poster_path)
							results.results[i].img = this.film_service.config.images.base_url + 'original' + results.results[i].poster_path;
						else
							results.results[i].img = this.no_img;
						this.results.push(results.results[i]);
					}
				}
			});
		});
		this.route.queryParams.subscribe(params => {
			if (params != {}) {
				this.search_data.advanced = params.advanced == "true" ? true : false;
				this.search_data.filters = params.filters ? JSON.parse(params.filters) : {};
				this.search_data.groups = params.groups ? JSON.parse(params.groups) : {};
				// this.search_data.groups_visible = params.groups_visible ? JSON.parse(params.groups_visible) : {};
				this.search_data.search_string = params.search_string ? params.search_string : '';
				this.search_data.keys = Object.keys(this.search_data.groups);
			}
			this.show_loader = true;
			this.get_results().subscribe(results => {
				this.results = results.results;
				console.log(this.results);
				for (var i = 0; i < this.results.length; i++) {
					if (this.results[i].poster_path)
						this.results[i].img = this.film_service.config.images.base_url + 'original' + this.results[i].poster_path;
					else
						this.results[i].img = this.no_img;
				}
				this.show_loader = false;
			});
		});
	}

	get_results() {
		// var query_part = '?query_term=' + this.search_data.search_string;
		var query_part = '?api_key=' + this.film_service.api_key + '&query=' + this.search_data.search_string;
		var method = this.search_data.search_string != '' ? 'search' : 'discover';
		for (var i = 0; i < this.search_data.keys.length; i++) {
			var key = this.search_data.keys[i];
			if (this.search_data.filters[key] && this.search_data.filters[key] != '')
				query_part += '&' + key + '=' + this.search_data.filters[key];
		}
		query_part += '&limit=' + this.limit;
		query_part += '&page=' + this.page++;
		// this._url = 'https://yts.lt/api/v2/list_movies.json' + query_part;
		this._url = this.film_service.movie_db_url + method + '/movie' + query_part;
		console.log(this._url);
		return this.http.get<ISearchResult>(this._url);
		
	}

	// get_final_filters() {
	// 	var groups = Object.keys(this.search_data.groups_visible);
	// 	var filters = Object.assign({}, this.search_data.filters);
	// 	for (var i = 0; i < groups.length; i++) {
	// 		if (!this.search_data.groups_visible[groups[i]])
	// 			delete filters[groups[i]];
	// 		else {
	// 			var keys = Object.keys(filters[groups[i]]);
	// 			for (var j = 0; j < keys.length; j++) {
	// 				if (!filters[groups[i]][keys[j]])
	// 					delete filters[groups[i]][keys[j]];
	// 			}
	// 			if (keys.length > 0 && Object.keys(filters[groups[i]]).length == 0)
	// 				delete filters[groups[i]];
	// 		}
	// 	}
	// 	return filters;
	// }

	watch_movie(id) {
		this.router.navigate(['/watch/' + id]);
	}

	refresh_search() {
		// console.log(this.search_data);
		this.show_loader;
		this.results = false;
		this.page = 1;
		this.ngOnInit();
		// this.get_results().subscribe(results => {
		// 	this.results = results;
		// });
	}
}
// https://yts.lt/api/v2/list_movies.json?query_term=terminator&genre=All&quality=All&sort_by=date_added&order_by=desc&page=1