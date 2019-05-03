import { Component, OnInit, Input } from '@angular/core';

declare var require: any

@Component({
  selector: '.app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.css']
})
export class ToolComponent implements OnInit {
	@Input() public tool_id: string;

	public icon;
	private tool_map = {
		login: {
			icon: require('./assets/login.png'),
		},
		logout: {
			icon: require('./assets/logout.png'),
		},
	}
	public test;
	public id;

	constructor() {
		// console.log(parentData);
		// this.id = this.tool_id;
		// if (this.tool_id)
	}

	ngOnInit() {
		this.id = this.tool_id;
		this.icon = this.tool_map[this.tool_id].icon;
		// console.log(this.id + '42');
	}

}
