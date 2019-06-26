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
				this.user_service.get_current_user().subscribe(data => {
					this.page_user = data[this.user_id] || false;
					this.form_data = {
						login: this.page_user.login,
						first_name: this.page_user.first_name,
						last_name: this.page_user.last_name,
						email: this.page_user.email,
						lang: this.page_user.lang,
					};
					if (this.page_user.avatar != '') {
						this.avatar = data[this.user_id].avatar;
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

}
