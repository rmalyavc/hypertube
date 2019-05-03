import { Component, OnInit } from '@angular/core';
import { ToolsComponent } from '../tools/tools.component';

declare var require: any

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	private logo = require('./assets/logo.png');
	public buttons = ['login', 'logout'];
	constructor() { }

	ngOnInit() {
	}

	// update_text() {
	// 	this.background = this.background == 'white' ? 'black' : 'white';
	// }
}
