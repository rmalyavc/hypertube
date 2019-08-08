import { Component, OnInit } from '@angular/core';
import { ToolsComponent } from '../tools/tools.component';
import { UserService } from '../user.service';
import { BaseComponent } from '../base/base.component';

declare var require: any

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends BaseComponent implements OnInit {
	private logo = require('./assets/logo.png');
	public buttons: string[];

	ngOnInit() {
		this.buttons = this.current_user ? ['logout', 'profile', 'lang'] : ['login', 'lang'];
	}
	
}
