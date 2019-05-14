import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
	selector: '.app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent extends BaseComponent implements OnInit {
	private advanced: boolean = false;

	ngOnInit() {

	}

	show_advanced() {
		this.advanced = this.advanced ? false : true;
	}
}
