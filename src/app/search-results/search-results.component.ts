import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SearchService } from '../search.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { LangService } from '../lang.service';
import { ISearchResult } from '../SearchResult';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent extends BaseComponent implements OnInit {
	private search_data: any = {};
	private filts: any = {};
	private results: any = {};
	private _url: string = '';
	private show_description: any = {};

	constructor(private http: HttpClient, public user_service: UserService, public router: Router, public route: ActivatedRoute, public lang_service: LangService) {
		super(user_service, router, route, lang_service);
	}

	ngOnInit() {
		this.route.queryParams.subscribe(params => {
			this.search_data.advanced = params.advanced == "true" ? true : false;
			this.search_data.filters = JSON.parse(params.filters);
			this.search_data.groups = JSON.parse(params.groups);
			this.search_data.groups_visible = JSON.parse(params.groups_visible);
			this.search_data.search_string = params.search_string;
			this.search_data.keys = Object.keys(this.search_data.groups);
			this.get_results().subscribe(results => {
				this.results = results;
				this.show_description = {};
				for (var i = 0; i < this.results.data.movie_count; i++) {
					this.show_description[i] = false;
				}
				console.log(this.results);
			});
		});
	}

	get_results() {
		var filters = this.get_final_filters();
		var query_part = '?query_term=' + this.search_data.search_string;
		if (filters.video) {
			query_part += '&genre[]='
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
		console.log(filters);
	}

	get_final_filters() {
		var groups = Object.keys(this.search_data.groups_visible);
		var filters = Object.assign({}, this.search_data.filters);
		for (var i = 0; i < groups.length; i++) {
			if (!this.search_data.groups_visible[groups[i]])
				delete filters[groups[i]];
			else {
				var keys = Object.keys(filters[groups[i]]);
				for (var j = 0; j < keys.length; j++) {
					if (!filters[groups[i]][keys[j]])
						delete filters[groups[i]][keys[j]];
				}
				if (keys.length > 0 && Object.keys(filters[groups[i]]).length == 0)
					delete filters[groups[i]];
			}
		}
		return filters;
	}

	description_visible(i, show) {
		var to_add = show ? 0.1 : -0.1;
		var current_val = show ? 0 : 1;
		var elem = document.getElementById('result_description_' + i);
		var interval_id = setInterval(function() {
			current_val += to_add;
			elem.style.opacity = String(current_val);
			if ((!show && current_val <= 0) || (show && current_val >= 1))
				clearInterval(interval_id);
		}, 50);	
	}

	watch_movie(id) {
		this.router.navigate(['/watch/' + id]);
	}
}
