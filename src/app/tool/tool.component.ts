import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { BaseComponent } from '../base/base.component';

declare var require: any

@Component({
  selector: '.app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.css']
})
export class ToolComponent extends BaseComponent implements OnInit {
	@Input() public tool_id: string;

	public icon;
	private action: any;
	public id;

	private tool_map = {
		login: {
			is_icon: true,
			icon: require('./assets/login.png'),
			action: this.redirect_to_login,
		},
		logout: {
			is_icon: true,
			icon: require('./assets/logout.png'),
			action: this.logout,
		},
		profile: {
			is_icon: false,
		},
	}
	// constructor() {
	// }

	ngOnInit() {
		this.get_mod_strings('application');
		this.id = this.tool_id;
		this.action = !this.tool_map[this.id].is_icon ? false : this.tool_map[this.id].action;
		this.icon = this.id != 'profile' ? this.tool_map[this.id].icon : false;
	}
	
}
