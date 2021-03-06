import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

declare var require: any;

@Component({
  selector: '.app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent extends BaseComponent implements OnInit {
	private wolf = require('./assets/wolf.png');

	ngOnInit() {
		this.get_mod_strings('application');
	}

}
