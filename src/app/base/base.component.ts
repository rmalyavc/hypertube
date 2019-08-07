import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { LangService } from '../lang.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
	selector: 'app-base',
	template: ``,
	styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
	public component_name: string = 'BaseComponent';
	public project_name = 'Hypertube';
	public creators = ['rmalyavc,', 'dkliukin'];
	public current_user: any;
	public app_strings: any = {};
	public mod_strings: any = {};
	public show_fog: boolean = false;
	public show_loader: boolean = false;
	public confirm_question: string = '';
	public errors: string[] = [];

	constructor(public user_service: UserService, public router: Router, public route: ActivatedRoute, public lang_service: LangService) {
		this.current_user = JSON.parse(localStorage.getItem('current_user') || 'false');
		// this.current_user.lang = 'RU';
		// this.lang_service.get_labels(this.current_user.lang).subscribe(data => {
		// 	this.app_strings = data;
		// });
		this.component_name = this.constructor.name;
		// this.get_mod_strings();
	}

	ngOnInit() {
		// console.log(this.current_user);
	}

	public redirect_to_login() {
		this.router.navigate(['login']);
	}

	public redirect_to_home(reload = false) {
		this.router.navigate(['']);
		if (reload)
			window.location.href = '/';
	}

	public check_login() {
		if (!this.current_user)
			this.redirect_to_home(true);
		else {
			this.user_service.is_logged_in(this.current_user).subscribe(data => {
				if (!data.status)
					this.logout();
			});
		}
	}

	public logout() {
		this.user_service.logout_user(this.current_user).subscribe(data => {
			localStorage.removeItem('current_user');
			this.current_user = false;
			window.location.href = '/login';	
		});
	}

	public get_mod_strings(component = this.component_name, lang = this.current_user.lang, callback = function() { return ;}) {
		this.lang_service.get_labels(lang, component).subscribe(data => {
			if (component != 'application')
				Object.assign(this.mod_strings, data);
			else
				Object.assign(this.app_strings, data);
			callback();

		}, error => {
			if (error.status == 404) {
				this.mod_strings = {};
			}
			callback();
		});
		// return true;
	}
}
