import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
	@Output() refresh_search: EventEmitter<boolean> = new EventEmitter<boolean>();
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
		console.log(this.parent_data);
		if (this.parent_data != false && this.parent_data != {}) {
			this.keys = this.parent_data.keys ? this.parent_data.keys : this.keys;
			this.advanced = this.parent_data.advanced ? this.parent_data.advanced : this.advanced;
			this.filters = this.parent_data.filters ? this.parent_data.filters : this.filters;
			this.groups = this.parent_data.groups ? this.parent_data.groups : this.groups;
			this.groups_visible = this.parent_data.groups_visible ? this.parent_data.groups_visible : this.groups_visible;
			this.search_string = this.parent_data.search_string ? this.parent_data.search_string : this.search_string;
		}
		// else {
		// 	this.groups = this.get_filters().subscribe(data => {
		// 		this.groups = data;
		// 		this.keys = Object.keys(this.groups);
		// 		for (var i = 0; i < this.keys.length; i++) {
		// 			var group = this.keys[i];
		// 			this.groups_visible[group] = true;
		// 			var cats = this.groups[group];
		// 			this.filters[group] = {};
		// 			for (var j = 0; j < cats.length; j++) {
		// 				this.filters[group][cats[j]] = true;
		// 			}
		// 		}
		// 	});
		// }
			
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
                groups_visible: JSON.stringify(this.groups_visible),
                advanced: this.advanced,
            }
        }
		this.router.navigate(['/'], navigationExtras);
		var that = this;
		setTimeout(function() {
			that.refresh_search.emit(true);	
		}, 300);
		
	}
}
