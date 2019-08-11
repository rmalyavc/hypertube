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
	public no_img: string = require('./assets/no_image.png');
	private end_of_results: boolean = false;

	constructor(private http: HttpClient, public user_service: UserService, public router: Router, public route: ActivatedRoute, public lang_service: LangService, public search_service: SearchService, public film_service: FilmService) {
		super(user_service, router, route, lang_service);
	}

	ngOnInit() {
		this.film_service.lang = this.page_lang;
		this.get_mod_strings('application', this.page_lang, () => {
			this.get_mod_strings('SearchComponent', this.page_lang, () => {
				this.end_of_results = false;
				this.load_more.subscribe(v => {
					if (!this.end_of_results) {
						this.film_service.search_movies(this.search_data, this.page).subscribe(results => {
							if (results.results) {
								for (var i = 0; i < results.results.length; i++) {
									if (results.results[i].poster_path)
										results.results[i].img = this.film_service.config.images.base_url + 'original' + results.results[i].poster_path;
									else
										results.results[i].img = this.no_img;
									if (this.results)
										this.results.push(results.results[i]);
								}
								if (results.results.length > 0)
									this.page++;
								else
									this.end_of_results = true;
							}
						}, error => {
							this.handle_request_error();
						});
					}
				});
				this.route.queryParams.subscribe(params => {
					if (params != {}) {
						this.search_data.advanced = params.advanced == "true" ? true : false;
						this.search_data.filters = params.filters ? JSON.parse(params.filters) : {};
						this.search_data.groups = params.groups ? JSON.parse(params.groups) : {};
						this.search_data.search_string = params.search_string ? params.search_string : '';
						this.search_data.keys = Object.keys(this.search_data.groups);
					}
					this.show_loader = true;
					this.page = 1;
					this.film_service.search_movies(this.search_data, this.page).subscribe(results => {
						this.results = results.results;
						for (var i = 0; i < this.results.length; i++) {
							if (this.results[i].poster_path)
								this.results[i].img = this.film_service.config.images.base_url + 'original' + this.results[i].poster_path;
							else
								this.results[i].img = this.no_img;
						}
						if (this.results.length > 0)
							this.page++;
						else
							this.end_of_results = true;
						this.show_loader = false;
					}, error => {
						this.handle_request_error();
					});
				});
			});
		});
	}

	watch_movie(id) {
		this.router.navigate(['/watch/' + id]);
	}

	refresh_search() {
		this.show_loader;
		this.results = false;
		this.page = 1;
		this.ngOnInit();
	}
}
// https://yts.lt/api/v2/list_movies.json?query_term=terminator&genre=All&quality=All&sort_by=date_added&order_by=desc&page=1