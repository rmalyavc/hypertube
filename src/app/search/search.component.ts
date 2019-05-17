import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { HttpClient } from '@angular/common/http';
import { IFilter } from '../Filter';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { LangService } from '../lang.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
	selector: '.app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent extends BaseComponent implements OnInit {
	private advanced: boolean = false;
	private filters = {};
	private groups = {};
	private groups_visible = {};
	private keys: string[];
	private _url: string;

	constructor(private http: HttpClient, public user_service: UserService, public router: Router, public route: ActivatedRoute, public lang_service: LangService) {
		super(user_service, router, route, lang_service);
	}

	ngOnInit() {
		this.groups = this.get_filters().subscribe(data => {
			this.groups = data;
			this.keys = Object.keys(this.groups);
			console.log(this.groups);
			for (var i = 0; i < this.keys.length; i++) {
				var group = this.keys[i];
				this.groups_visible[group] = true;
				var cats = this.groups[group];
				this.filters[group] = {};
				for (var j = 0; j < cats.length; j++) {
					this.filters[group][cats[j]] = true;
				}
			}
			console.log(this.groups_visible);
			console.log(this.filters);
		});
	}

	get_filters() {
		this._url = '/assets/data/filters.json';
		return this.http.get<IFilter>(this._url);
	}

	show_advanced() {
		this.advanced = this.advanced ? false : true;
	}

	// change_filters() {
	// 	this.filters.people = !this.filters.people ? true : false;
	// 	this.filters.actors = this.filters.people;
	// 	this.filters.users = this.filters.people;
	// }
}
