import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: '.app-comments',
	templateUrl: './comments.component.html',
	styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
	@Input() private film_data: any;

	constructor() { }

	ngOnInit() {
	}

}
