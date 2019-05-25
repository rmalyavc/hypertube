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
		var groups = Object.keys(this.search_data.groups_visible);
		var filts = this.search_data.filters;
		// for (var i = 0; i < groups.length; i++) {
		// 	if (!this.search_data.groups_visible[groups[i]])
		// 		delete filts[groups[i]];
		// 	else {
		// 		var keys = Object.keys(this.search_data.filters[groups[i]]);
		// 		var count = 0;
		// 		var to_del = [];
		// 		for (var j = 0; j < keys.length; j++) {
		// 			if (!this.search_data.filters[groups[i]][keys[j]])
		// 				to_del.push(keys[j]);
		// 			else
		// 				count++;
		// 		}
		// 		// if (to_del.length == 0)
		// 		// 	continue ;
		// 		// else if (count == 0)
		// 		// 	delete filts[groups[i]];
		// 		// else {
		// 		// 	for (var j = 0; j < to_del.length; j++) {
		// 		// 		delete filts[groups[i]][to_del[j]];
		// 		// 	}
		// 		// }
		// 		// if (count == 0 && keys.length > 0)
		// 		// 	delete this.filters[groups[i]];
		// 	}
		// }
		console.log(filts);
	}
}
