import { Component, OnInit } from '@angular/core';
import { ToolsComponent } from '../tools/tools.component';
import { UserService } from '../user.service';

declare var require: any

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	private logo = require('./assets/logo.png');
	private current_user: any;
	public buttons: string[];

	constructor(private user_service: UserService) { }

	ngOnInit() {
		this.current_user = this.user_service.get_current_user();
		this.buttons = this.current_user ? ['logout', 'profile'] : ['login'];
		// console.log(this.current_user);
		// console.log(this.buttons);
	}
	
}
