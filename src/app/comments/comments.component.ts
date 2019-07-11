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
	@Input() private movie_data: any;

	// constructor(private film_service: FilmService, public lang_service: LangService) { }

	ngOnInit() {
		this.base_url = this.user_service.get_base_url() + '/';
		this.film_service.get_comments(this.current_user, this.movie_data.id).subscribe(res => {
			if (res.status) {
				for (var i = 0; i < res.data.length; i++) {
					// if (!res.data[i].avatar || res.data[i].avatar == '' || typeof res.data[i].avatar == 'undefined')
					// 	res.data[i].avatar = this.avatar;
					this.comments.push(res.data[i])
				}
			}
			console.log(res);
		});
	}

}
