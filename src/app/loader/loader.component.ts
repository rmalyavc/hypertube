import { Component, OnInit } from '@angular/core';

declare var require: any

@Component({
  selector: '.app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
	private loader: string = require('./assets/loader.gif');

	constructor() { }

	ngOnInit() {

	}

}
