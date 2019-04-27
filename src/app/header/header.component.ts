import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	private logo = require('./assets/logo.png');
	public test = 'This is test';
	public background = 'none';

	constructor() { }

	ngOnInit() {
	}

	update_text() {
		this.background = this.background == 'white' ? 'black' : 'white';
	}
}
