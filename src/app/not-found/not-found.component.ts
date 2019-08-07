import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

declare var require: any;

@Component({
	selector: 'app-not-found',
	templateUrl: './not-found.component.html',
	styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent extends BaseComponent implements OnInit {
	private img = require('./assets/404.png');
	
	// constructor() { }

	ngOnInit() {
		this.get_mod_strings('application');
	}

}
