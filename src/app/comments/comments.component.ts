import { Component, OnInit, Input } from '@angular/core';
import { FilmService } from '../film.service';
import { LangService } from '../lang.service';
import { WatchComponent } from '../watch/watch.component';

declare var require: any

@Component({
	selector: '.app-comments',
	templateUrl: './comments.component.html',
	styleUrls: ['./comments.component.css']
})
export class CommentsComponent extends WatchComponent implements OnInit {
	private comments: string[] = [];
	private avatar: string = require('./assets/avatar.png');
	private base_url: string = ''; 
	private comment_value: string = '';
	@Input() private movie_data: any;

	// constructor(private film_service: FilmService, public lang_service: LangService) { }

	ngOnInit() {
		this.base_url = this.user_service.get_base_url() + '/';
		// if (this.comments.length == 0)
		this.get_comments();
	}

	send_comment() {
		this.film_service.post_comment(this.current_user, this.movie_data.id, this.comment_value).subscribe(res => {
			if (res.status) {
				this.get_comments(1, true);
				// this.ngOnInit();
			}
			this.comment_value = '';
		});
	}

	get_comments(limit: number = 10, append: boolean = false) {
		this.film_service.get_comments(this.current_user, this.movie_data.id, limit).subscribe(res => {
			if (res.status) {
				console.log(res);
				for (var i = 0; i < res.data.length; i++) {
					if (!append)
						this.comments.push(res.data[i]);
					else
						this.comments.unshift(res.data[i]);
				}
			}
		});
	}
}
