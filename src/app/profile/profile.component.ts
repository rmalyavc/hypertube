import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { LangService } from '../lang.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { FilmService } from '../film.service';
import { IResult } from '../Result.js';


declare var require: any

@Component({
	selector: '.app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends BaseComponent implements OnInit {
	public user_id: string;
	public page_user: any;
	private avatar: string = require('./assets/default/avatar.png');
	private edit_icon: string = require('./assets/default/edit_icon.png');
	private browse_icon: string = require('./assets/default/browse_icon.png');
	private form_data = {
		uid: '',
		login: '',
		first_name: '',
		last_name: '',
		email: '',
		lang: '',
		notify: false,
		token: '',
	};
	public history: string[] = [];
	private file: any = null;
	private update_status: boolean = true;
	private file_error: string = '';
	private tmp: string = '';
	private edit: boolean = false;
	private owner: boolean = false;
	private input_text: string = '';

	constructor(private http: HttpClient, public user_service: UserService, public router: Router, public route: ActivatedRoute, public lang_service: LangService, public film_service: FilmService) {
		super(user_service, router, route, lang_service);
	}

	ngOnInit() {
		this.page_user = false;
		
		this.get_mod_strings('application', this.page_lang, () => {
			this.get_mod_strings(this.component_name, this.page_lang, () => {
				if (!this.current_user)
					this.router.navigate(['']);
				else {
					this.check_login();
					this.file = null;
					this.file_error = '';
					this.route.params.subscribe(params => {
						this.user_id = params['id'];
						this.show_loader = true;
						this.user_service.get_user_profile(this.user_id, this.current_user).subscribe(res => {
							this.input_text = this.mod_strings.LBL_CHOOSE_AVATAR;
							this.page_user = res.data || false;
							this.owner = this.page_user.uid == this.current_user.uid;
							if (this.page_user) {
								this.page_user.id = this.page_user.uid;
								this.form_data = {
									uid: this.page_user.uid,
									login: this.page_user.login,
									first_name: this.page_user.first_name,
									last_name: this.page_user.last_name,
									email: this.page_user.email,
									lang: this.page_user.lang,
									notify: this.page_user.notify,
									token: this.current_user.token
								};
								if (this.page_user.avatar && this.page_user.avatar != '') {
									this.avatar = this.page_user.avatar;
									if (this.avatar.indexOf('http') === -1)
										this.avatar = this.user_service.get_base_url() + this.avatar;
								}
								else
									this.avatar = require('./assets/default/avatar.png');
							}
							this.show_loader = false;
							if (this.history.length == 0)
								this.get_brawsing_history(5);
						}, error => {
							this.handle_request_error();
						});
					});
				}
			});
		});
	}

	private file_selected(event) {
		if (event.target.files.length > 0) {
			this.file = event.target.files[0];
			this.input_text = this.file.name && this.file.name != '' ? this.file.name : this.mod_strings.LBL_CHOOSE_AVATAR;
		}
	}

	private upload_file() {
		var fd = new FormData();
		var _url = this.user_service.get_base_url() + '/user/update/image';
		fd.append('image', this.file, this.file.name);
		fd.append('token', this.current_user.token);
		fd.append('lang', this.current_user.lang);
		this.http.post<IResult>(_url, fd).subscribe(res => {
			if (res.status == true) {
				this.file = null;
				(<HTMLInputElement>document.getElementById('avatar_input')).value = '';
				this.edit = false;
				this.ngOnInit();
			}
			else {
				this.file_error = this.app_strings['LBL_ERR_' + res.error] || this.app_strings.LBL_ERR_500;
			}
		}, error => {
			this.handle_request_error();
		});
	}
	private trigger_file() {
		document.getElementById('avatar_input').click();
	}

	private update() {
		var form_data = Object.assign({}, this.form_data);
		delete form_data.login;
		this.user_service.update_user(form_data).subscribe(res => {
			this.update_status = res.status;
			this.errors = [];
			if (res.errors) {
				var keys = Object.keys(res.errors);
				for (var i = 0; i < keys.length; i++) {
					for (var j = 0; j < res.errors[keys[i]].length; j++) {
						this.tmp = res.errors[keys[i]][j];
						this.errors.push(this.tmp);
					}
				}
			}
			else {
				res.data.token = this.current_user.token;
				res.data.id = res.data.uid;
				localStorage.setItem('current_user', JSON.stringify(res.data));
				this.current_user = res.data;
				this.change_editable();
				window.location.reload();
			}
		}, error => {
			this.handle_request_error();
		});

	}

	private change_editable() {
		if (this.owner)
			this.edit = !this.edit;
		else
			this.edit = false;
	}

	public watch_movie(movie_id) {
		this.router.navigate(['/watch/' + movie_id]);
	}

	public get_brawsing_history(limit: number = 20, skip: number = 0, order_by: string = 'updated_at', sort_order: string = 'ASC') {
		this.film_service.get_history(this.page_user, this.current_user, limit, skip, order_by, sort_order).subscribe(res => {
			if (res.status) {
				for (var i = 0; i < res.data.length; i++) {
					this.history.push(res.data[i]);
				}
			}
		}, error => {
			this.handle_request_error();
		});
	}
}
