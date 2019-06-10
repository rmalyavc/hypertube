import { Component, OnInit, Input } from '@angular/core';
import { FilmService } from '../film.service';
import { LangService } from '../lang.service';

@Component({
	selector: '.app-comments',
	templateUrl: './comments.component.html',
	styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
	private comments: any = {};
	@Input() private film_data: any;

	constructor(private film_service: FilmService, public lang_service: LangService) { }

	ngOnInit() {
		// this.comments = this.film_service.get_comments(this.film_data.id).subscribe(res => {
		// 	console.log(res);
		// });
	}

}
