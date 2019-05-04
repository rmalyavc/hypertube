import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';

declare var require: any

@Component({
  selector: '.app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.css']
})
export class ToolComponent implements OnInit {
	@Input() public tool_id: string;
	@Input() current_user : any;

	public icon;

	private tool_map = {
		login: {
			is_icon: true,
			icon: require('./assets/login.png'),
		},
		logout: {
			is_icon: true,
			icon: require('./assets/logout.png'),
		},
		profile: {
			is_icon: false,
		}
	}
	public test;
	public id;

	constructor() {
	}

	ngOnInit() {
		this.id = this.tool_id;
		this.icon = this.id != 'profile' ? this.tool_map[this.id].icon : false;
	}

}
