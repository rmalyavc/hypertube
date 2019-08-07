import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

declare var require: any

@Component({
  selector: '.app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent extends BaseComponent implements OnInit {
	private loader: string = require('./assets/loader.gif');

	ngOnInit() {
		this.get_mod_strings('application');
	}

}
