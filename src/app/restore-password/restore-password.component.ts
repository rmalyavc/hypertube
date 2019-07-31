import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { UserService } from '../user.service';
import { LangService } from '../lang.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: '.app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.css']
})
export class RestorePasswordComponent extends BaseComponent implements OnInit {
	private action: string = '';
	private form_data: any = {
		action: '',
		token: '',
		password: '',
		password_confirmation: '',
		old_password: '',
		email: ''
	};
	private header: string = '';
	private errors: string[] = [];

	constructor(public user_service: UserService, public router: Router, public route: ActivatedRoute, public lang_service: LangService) {
		super(user_service, router, route, lang_service);
		this.get_mod_strings();
	}

	ngOnInit() {
		this.errors = [];
		console.log(this.mod_strings);
		this.route.params.subscribe(params => {
			this.action = params['action'];
			this.header = this.mod_strings['LBL_' + this.action.toUpperCase()];
			this.form_data.action = this.action;
			if (this.action == 'recover') {
				this.route.queryParams.subscribe(params => {
					if (!params.token || params.token == '') {
						this.errors.push(this.mod_strings.LBL_ERR_NO_TOKEN);
					}
					else {
						this.form_data.token = params.token;
					}
				});
			}
		});
	}

	recover_password() {
		this.user_service.change_password(this.form_data).subscribe(res => {
			console.log(res);
		});
	}
}
