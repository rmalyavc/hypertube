import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { LangService } from '../lang.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { FilmService } from '../film.service';


declare var require: any

@Component({
	selector: '.app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends BaseComponent implements OnInit {
	private user_id: string;
	private page_user: any;
	public avatar: string = require('./assets/default/avatar.png');
	private form_data = {
		login: '',
		first_name: '',
		last_name: '',
		email: '',
		lang: '',
	};
	private history: any = [];
	private file: any = null;

	constructor(private http: HttpClient, public user_service: UserService, public router: Router, public route: ActivatedRoute, public lang_service: LangService, public film_service: FilmService) {
		super(user_service, router, route, lang_service);
	}

	ngOnInit() {
		if (!this.current_user)
			this.router.navigate(['']);
		else {
			this.check_login();
			this.route.params.subscribe(params => {
				this.user_id = params['id'];
				this.user_service.get_user_profile(this.user_id, this.current_user).subscribe(res => {
					console.log(res);
					this.page_user = res.data || false;
					if (this.page_user)
						this.page_user.id = this.page_user.uid;
					this.form_data = {
						login: this.page_user.login,
						first_name: this.page_user.first_name,
						last_name: this.page_user.last_name,
						email: this.page_user.email,
						lang: this.page_user.lang,
					};
					if (this.page_user.avatar && this.page_user.avatar != '') {
						this.avatar = this.page_user.avatar;
					}
					// var history = this.history;
					// this.history = this.film_service.get_history(this.current_user.id, 5).subscribe(data => {
						
					// 	for (var i = 0; i < data.length; i++) {
					// 		history.push(data[i]);
					// 	}
					// 	// console.log(history);
					// });
					// console.log(this.history);
				});
			});
		}
		// setTimeout(() => {
		// 	console.log(this.history);
		// }, 3000);
	}

	file_selected(event) {
		this.file = event.target.files[0];
		// console.log(event);
	}

	upload_file() {
		var fd = new FormData();
		var _url = 'https://7fecca09.ngrok.io/user/update/image';
		fd.append('image', this.file, this.file.name);
		this.http.post(_url, fd).subscribe(res => {
			console.log(res);
		});
	}
}
