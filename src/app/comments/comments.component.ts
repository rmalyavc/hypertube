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
	private comments: any = [];
	private avatar: string = require('./assets/avatar.png');
	private base_url: string = ''; 
	private comment_value: string = '';
	private edit_icon: string = require('./assets/edit_icon.png');
	private delete_icon: string = require('./assets/delete_icon.png');
	private confirmation_info: any = {
		question: '',
		action: '',
		nb: 0
	};
	@Input() private movie_data: any;

	// constructor(private film_service: FilmService, public lang_service: LangService) { }

	ngOnInit() {
		this.get_mod_strings();
		this.base_url = this.user_service.get_base_url();
		// if (this.comments.length == 0)
		this.get_comments();
		console.log(this.comments);
	}

	send_comment() {
		this.show_loader = true;
		this.film_service.post_comment(this.current_user, this.movie_data.id, this.comment_value).subscribe(res => {
			if (res.status) {
				this.get_comments(1, true);
				// this.ngOnInit();
			}
			this.comment_value = '';
			this.show_loader = false;
		});
	}

	get_comments(limit: number = 10, append: boolean = false) {
		this.film_service.get_comments(this.current_user, this.movie_data.id, limit).subscribe(res => {
			if (res.status) {
				console.log(res);
				for (var i = 0; i < res.data.length; i++) {
					res.data[i].editable = false;
					if (!append)
						this.comments.push(res.data[i]);
					else
						this.comments.unshift(res.data[i]);
				}
			}
		});
	}

	enable_edit(nb) {
		this.comments[nb].editable = !this.comments[nb].editable;
	}

	get_confirmation(action, nb) {
		var params = {
			'delete_comment': {
				confirm_question: this.mod_strings.LBL_CONFIRM_DELETE,
			},
			'update_comment': {
				confirm_question: this.mod_strings.LBL_CONFIRM_UPDATE,
			}
		}
		this.confirmation_info.action = action;
		this.confirmation_info.nb = nb;
		this.confirmation_info.question = params[action].confirm_question;
		this.show_fog = !this.show_fog;
	}

	update_comment(nb) {
		this.show_loader = true;
		this.film_service.update_comment(this.current_user, this.comments[nb]).subscribe(res => {
			this.comments[nb].editable = false;
			this.show_loader = false;
		});
	}

	delete_comment(nb) {
		this.show_loader = true;
		this.film_service.delete_comment(this.current_user, this.comments[nb]).subscribe(res => {
			this.comments[nb].editable = false;
			if (res.status) {
				this.comments.splice(nb, 1);
			}
			this.show_loader = false;
		});
	}

	on_confirm(event) {
		this.show_fog = false;
		if (!event)
			return ;
		else if (this.confirmation_info.action == 'delete_comment')
			this.delete_comment(this.confirmation_info.nb);
		else if (this.confirmation_info.action == 'update_comment')
			this.update_comment(this.confirmation_info.nb);
	}
}
