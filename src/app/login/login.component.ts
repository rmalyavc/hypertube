import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

declare var require: any;

@Component({
  selector: '.app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {
	public logo_42: string = require('./assets/logo42.png');
	public logo_git: string = require('./assets/logo_git.png');
	public intra_link: string = '';
	public git_link: string = '';
	public form_data: any = {
		login: '',
		password: ''
	};
	// private success: boolean;

	ngOnInit() {
		this.intra_link = `https://api.intra.42.fr/oauth/authorize?client_id=b7b682799d4496b76ffcd54b3f4c49dafc34fce08f98f8f30fe496681f0c254a&redirect_uri=https%3A%2F%2Fdac2df49.ngrok.io%2Fuser%2F42%2Fauth&response_type=code`;
		this.git_link = `https://github.com/login/oauth/authorize?login=Kandzy&client_id=f0e6b1255d577c196e1f&redirect_uri=https://dac2df49.ngrok.io/user/git/auth`;
		this.get_mod_strings('application', this.page_lang, () => {
			this.route.queryParams.subscribe(params => {
				if (params['uid'] && params['token']) {
					this.user_service.get_user_profile(params['uid'], {token: params['token']}).subscribe(res => {
						if (res.status) {
							res.data['token'] = params['token'];
							res.data['id'] = params['uid'];
							localStorage.setItem('current_user', JSON.stringify(res.data));
							this.redirect_to_home(true);
						}
					});
				}
			});
		});
	}

	protected login() {
		if (this.form_data['login'] && this.form_data['password']) {
			this.user_service.login_user(this.form_data).subscribe(res => {
				if (res.status === true) {
					res.data.token = res.token;
					res.data.id = res.data.uid;
					localStorage.setItem('current_user', JSON.stringify(res.data));
					this.page_lang = res.data.lang;
					this.redirect_to_home(true);
				}
				else {
					this.form_data = {
						login: '',
						password: ''
					}
					this.success = false;
					this.errors.push(this.app_strings['LBL_LOGIN_FAILED']);
					this.handle_request_error(false, (res.error == '401' && this.app_strings['LBL_INVALID_LOGIN_PASSWORD']) || this.app_strings['LBL_ERR_' + res.error] || this.app_strings.LBL_ERR_500);
				}
			}, error => {
				this.handle_request_error();
			});
		}
	}
}
