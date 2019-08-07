import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../user.service';
import { LangService } from '../lang.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: '.app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.css']
})
export class RestorePasswordComponent extends LoginComponent implements OnInit {
	private action: string = '';
	public form_data: any = {
		action: '',
		token: '',
		password: '',
		password_confirmation: '',
		old_password: '',
		email: ''
	};
	private message: string = '';

	constructor(public user_service: UserService, public router: Router, public route: ActivatedRoute, public lang_service: LangService) {
		super(user_service, router, route, lang_service);
		this.get_mod_strings();
	}

	ngOnInit() {
		this.get_mod_strings('application', this.current_user.lang, () => {
			this.get_mod_strings(this.component_name, this.current_user.lang, () => {
				this.errors = [];
				this.route.params.subscribe(params => {
					this.action = params['action'];
					// this.header = this.mod_strings['LBL_' + this.action.toUpperCase()];
					this.form_data.action = this.action;
					if (this.action == 'recover') {
						this.route.queryParams.subscribe(params => {
							if (!params.token || params.token == '') {
								var obj = this;
								var interval_id = setInterval(function() {
									if (Object.keys(obj.mod_strings).length > 0) {
										clearInterval(interval_id);
										obj.errors.push(obj.mod_strings.LBL_ERR_NO_TOKEN);
									}
								}, 50);
							}
							else {
								this.form_data.token = params.token;
							}
						});
					}
					else if (this.action == 'change') {
						this.check_login();
						this.form_data.uid = this.current_user.uid;
						this.form_data.token = this.current_user.token;
					}
					else if (this.action != 'forgot')
						this.router.navigate(['not_found']);
				});
			});
		});
	}

	recover_password() {
		this.user_service.change_password(this.form_data).subscribe(res => {
			if (res && res.status) {
				if (this.action == 'forgot')
					this.message = this.mod_strings.LBL_LINK_SENT;
				else if (this.action == 'change')
					this.message = this.mod_strings['LBL_PASSWORD_CHANGED'];
				else if (this.action == 'recover' && res.data.login) {
					this.form_data.login = res.data.login;
					this.login();
				}
			}
			else {
				if (typeof res.error == 'object') {
					var err_keys = Object.keys(res.error);
					for (var i = 0; i < err_keys.length; i++) {
						var key = err_keys[i];
						for (var j = 0; res.error[key][j]; j++) {
							this.errors.push(res.error[key][j]);
						}
					}
				}
				else
					this.errors.push(res.error);
			}
		});
	}
}
