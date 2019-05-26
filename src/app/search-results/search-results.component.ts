import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent extends BaseComponent implements OnInit {
	private search_data: any = {};
	private filts: any = {};

	ngOnInit() {
		this.route.queryParams.subscribe(params => {
			this.search_data.advanced = params.advanced == "true" ? true : false;
			this.search_data.filters = JSON.parse(params.filters);
			this.search_data.groups = JSON.parse(params.groups);
			this.search_data.groups_visible = JSON.parse(params.groups_visible);
			this.search_data.search_string = params.search_string;
			this.search_data.keys = Object.keys(this.search_data.groups);
			this.get_results();
		});
	}

	get_results() {
		var filters = this.get_final_filters();
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
}
