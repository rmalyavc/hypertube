import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { HttpClient } from '@angular/common/http';
import { IFilter } from '../Filter';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { LangService } from '../lang.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';


@Component({
	selector: '.app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent extends BaseComponent implements OnInit {
	@Input() private parent_data: any = false;

	public advanced: boolean = false;
	public filters = {};
	public groups = {};
	public groups_visible = {};
	public keys: string[];
	public _url: string;
	public search_string: string;

	constructor(private http: HttpClient, public user_service: UserService, public router: Router, public route: ActivatedRoute, public lang_service: LangService) {
		super(user_service, router, route, lang_service);
	}

	ngOnInit() {
			if (this.parent_data != false) {
				this.keys = this.parent_data.keys;
				this.advanced = this.parent_data.advanced;
				this.filters = this.parent_data.filters;
				this.groups = this.parent_data.groups;
				this.groups_visible = this.parent_data.groups_visible;
				this.search_string = this.parent_data.search_string;
			}
			else {
				this.groups = this.get_filters().subscribe(data => {
					this.groups = data;
					this.keys = Object.keys(this.groups);
					for (var i = 0; i < this.keys.length; i++) {
						var group = this.keys[i];
						this.groups_visible[group] = true;
						var cats = this.groups[group];
						this.filters[group] = {};
						for (var j = 0; j < cats.length; j++) {
							this.filters[group][cats[j]] = true;
						}
					}
				});
			}
			
	}

	get_filters() {
		this._url = '/assets/data/filters.json';
		return this.http.get<IFilter>(this._url);
	}

	show_advanced() {
		this.advanced = this.advanced ? false : true;
	}

	// change_filters(key) {
	// 	this.filter_groups[key] = !this.filter_groups[key];
	// 	var keys = Object.keys(this.filters[key]);

	// 	for (var i = 0; i < keys.length; i++) {
	// 		this.filters[key][keys[i]] = !this.filters[key][keys[i]];
	// 	}
	// }

	do_search() {
		let navigationExtras: NavigationExtras = {
            queryParams: {
                filters: JSON.stringify(this.filters),
                search_string: this.search_string,
                groups: JSON.stringify(this.groups),
                groups_visible: JSON.stringify(this.groups_visible),
                advanced: this.advanced,
            }
        }
		this.router.navigate(['/search/results'], navigationExtras);
	}
}
