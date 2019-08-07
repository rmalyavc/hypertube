import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { HttpClient } from '@angular/common/http';
import { IFilter } from '../Filter';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { LangService } from '../lang.service';
import { FilmService } from '../film.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';


@Component({
	selector: '.app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent extends BaseComponent implements OnInit {
	@Output() refresh_search: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Input() private parent_data: any = false;

	public advanced: boolean = false;
	public filters = {};
	public groups = {};
	// public groups_visible = {};
	public keys: string[];
	public _url: string;
	public search_string: string;
	private dropdown_settings: any;
	private genre_list: any = [];

	constructor(private http: HttpClient, public user_service: UserService, public router: Router, public route: ActivatedRoute, public lang_service: LangService, public film_service: FilmService) {
		super(user_service, router, route, lang_service);
		
		
	}

	ngOnInit() {
		this.get_mod_strings('application', this.current_user.lang, () => {
			this.get_mod_strings(this.component_name, this.current_user.lang, () => {
				console.log(this.app_strings);
				this.dropdown_settings = {
					singleSelection: false,
					idField: 'item_id',
					textField: 'item_text',
					selectAllText: this.app_strings.LBL_SELECT_ALL,
					unSelectAllText: this.app_strings.LBL_SELECT_ALL,
					itemsShowLimit: 4,
					allowSearchFilter: true
				};
				this.groups = this.get_filters().subscribe(data => {
					var obj = this;
					var count = 0;
					var interval_id = setInterval(function() {
						if ((Object.keys(obj.film_service.genre_list).length > 0 || count++ > 50) && obj.collect_genres()) {
							obj.keys = Object.keys(obj.groups);
						
							for (var i = 0; i < obj.keys.length; i++) {
								var key = obj.keys[i];
								if (obj.groups[key].length > 0)
									obj.filters[key] = obj.groups[key][0];
							}
							clearInterval(interval_id);
						}
					}, 100)
					this.groups = data;
					
				});
				if (this.parent_data != false && this.parent_data != {}) {
					this.keys = this.parent_data.keys ? this.parent_data.keys : this.keys;
					this.advanced = this.parent_data.advanced ? this.parent_data.advanced : this.advanced;
					this.filters = this.parent_data.filters ? this.parent_data.filters : this.filters;
					this.groups = this.parent_data.groups ? this.parent_data.groups : this.groups;
					this.search_string = this.parent_data.search_string ? this.parent_data.search_string : this.search_string;
				}
			});
		});
	}

	get_filters() {
		this._url = '/assets/data/filters.json';
		return this.http.get<IFilter>(this._url);
	}

	show_advanced() {
		this.advanced = !this.advanced;
	}

	do_search() {
		let navigationExtras: NavigationExtras = {
            queryParams: {
                filters: JSON.stringify(this.filters),
                search_string: this.search_string,
                groups: JSON.stringify(this.groups),
                advanced: this.advanced,
            }
        }
		this.router.navigate(['/'], navigationExtras);
		var that = this;
		setTimeout(function() {
			that.refresh_search.emit(true);	
		}, 300);
	}
	collect_genres() {
		// console.log(this.groups);
		// return ;
		var genre_keys = Object.keys(this.film_service.genre_list);
		for (var i = 0; i < genre_keys.length; i++) {
			var key = genre_keys[i];
			this.groups['with_genres'].push(key);
			this.mod_strings.lists.with_genres[key] = this.film_service.genre_list[key];
			this.genre_list.push({item_id: key, item_text: this.film_service.genre_list[key]});
		}
		return true;
	}
	onItemSelect(item: any) {
	    console.log(item);
	}
	onSelectAll(items: any) {
	    console.log(items);
	}
}
