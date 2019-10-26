import { Component, OnInit, Input } from '@angular/core';
import { FilmService } from '../film.service';
import { LangService } from '../lang.service';
import { UserService } from '../user.service';
import { CommentService } from '../comment.service';
import { WatchComponent } from '../watch/watch.component';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

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
	private placeholder: string = '';
	private auto_complete: boolean = false;
	private suggests: string[] = [];
	private curr_pos: number = 0;
	@Input() private movie_data: any;

	constructor(private comment_service: CommentService, public http: HttpClient, public user_service: UserService, public router: Router, public route: ActivatedRoute, public lang_service: LangService, public film_service: FilmService) {
		super(http, user_service, router, route, lang_service, film_service);
	}

	ngOnInit() {
		this.get_mod_strings('application', this.page_lang, () => {
			this.get_mod_strings(this.component_name, this.page_lang, () => {
				this.get_mod_strings();
				this.base_url = this.user_service.get_base_url();
				this.placeholder = this.current_user ? this.mod_strings.LBL_COMMENT_PLACEHOLDER : this.mod_strings.LBL_COMMENT_PLACEHOLDER_NO_USER;
				this.get_comments();
			});
		});
	}

	send_comment() {
		this.show_loader = true;
		this.comment_service.post_comment(this.current_user, this.movie_data.id, this.comment_value).subscribe(res => {
			this.comment_value = '';
			if (res.status) {
				this.get_comments(1, true);
			}
			else
				this.handle_request_error(false, this.app_strings['LBL_ERR_' + res.error] || this.app_strings.LBL_ERR_500);
			this.show_loader = false;
		}, error => {
			this.comment_value = '';
			this.handle_request_error();
		});
	}

	get_comments(limit: number = 10, append: boolean = false) {
		this.comment_service.get_comments(this.current_user, this.movie_data.id, limit).subscribe(res => {
			if (res.status) {
				for (var i = 0; i < res.data.length; i++) {
					res.data[i].editable = false;
					if (!append)
						this.comments.push(res.data[i]);
					else
						this.comments.unshift(res.data[i]);
				}
				console.log(this.comments);
			}
		}, error => {
			this.handle_request_error();
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
		this.comment_service.update_comment(this.current_user, this.comments[nb]).subscribe(res => {
			this.comments[nb].editable = false;
			this.show_loader = false;
			if (!res.status)
				this.handle_request_error(false, this.app_strings['LBL_ERR_' + res.error] || this.app_strings.LBL_ERR_500);
			else
				this.comments[nb].parsed_comment = res['parsed_comment'];
		}, error => {
			this.handle_request_error();
		});
	}

	delete_comment(nb) {
		this.show_loader = true;
		this.comment_service.delete_comment(this.current_user, this.comments[nb]).subscribe(res => {
			this.comments[nb].editable = false;
			if (res.status) {
				this.comments.splice(nb, 1);
			}
			else
				this.handle_request_error(false, this.app_strings['LBL_ERR_' + res.error] || this.app_strings.LBL_ERR_500);
			this.show_loader = false;
		}, error => {
			this.handle_request_error();
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

	get_suggests(event, elem) {
		this.suggests = [];
		this.curr_pos = event.target.selectionStart;
		if (event.type == 'click') {
			this.curr_pos--;
			this.suggests = [];
		}
		else if (this.check_auto_complete(this.comment_value, this.curr_pos)) {
			let word = this.word_to_complete(this.comment_value, this.curr_pos);
			this.comment_service.get_suggests(this.current_user, word).subscribe(res => {
				this.suggests = res['data'].map(el => {
					if ((el.first_name || el.last_name) && (el.first_name != '' || el.last_name != '')) {
						el['initials'] = (el.first_name.toUpperCase().substr(0, 1) || '') + (el.last_name.toUpperCase().substr(0, 1) || '');
						el['full_name'] = (el.first_name.toUpperCase() || '') + ' ' + (el.last_name.toUpperCase() || '');
					}
					else {
						el['initials'] = el.login.substr(0, 1).toUpperCase();
						el['full_name'] = el.login;
					}
					return el;
				});
			});
		}
		else
			this.suggests = [];
	}

	complete(suggest) {
		let at_pos = this.at_position(this.comment_value, this.curr_pos);
		this.comment_value = this.comment_value.substr(0, at_pos + 1) + suggest.login + this.comment_value.substr(this.curr_pos, this.comment_value.length);
		this.suggests = [];
	}

	check_auto_complete(str, pos) {
		let sub = str.substr(0, pos);
		let at_pos = this.at_position(str, pos);
		let at_sub = str.substr(at_pos, pos);
		return at_pos != -1 &&
			pos - at_pos > 1 &&
			(at_pos == 0 ||
			at_pos > sub.lastIndexOf(' ') ||
			at_pos > sub.lastIndexOf(',') ||
			at_pos > sub.lastIndexOf(';') ||
			at_pos > sub.lastIndexOf("\t") ||
			at_pos > sub.lastIndexOf('.')) &&
			at_sub.lastIndexOf(' ') == -1 &&
			at_sub.lastIndexOf(',') == -1 &&
			at_sub.lastIndexOf(';') == -1 &&
			at_sub.lastIndexOf("\t") == -1 &&
			at_sub.lastIndexOf('.') == -1;
	}

	word_to_complete(str, pos) {
		let at_pos = this.at_position(str, pos);
		return str.substr(at_pos + 1, pos).toLowerCase();
	}

	at_position(str, pos) {
		return str.substr(0, pos).lastIndexOf('@');
	}
}
