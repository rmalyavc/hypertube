import { Component, OnInit, Input } from '@angular/core';
import { ToolComponent } from '../tool/tool.component';

@Component({
	selector: '.app-tools',
	templateUrl: './tools.component.html',
	styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {
	@Input() tool_ids : string[];
	@Input() current_user : any;

	public name = 'test';
	constructor() {}

	ngOnInit() {
	}
}
