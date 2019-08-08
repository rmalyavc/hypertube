import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';


@Component({
  selector: '.app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {
	public form_data: any = {
		login: '',
		password: ''
	};
	private success: boolean;

	ngOnInit() {
		this.get_mod_strings('application');
	}

	protected login() {
		if (this.form_data['login'] && this.form_data['password']) {
			this.user_service.login_user(this.form_data).subscribe(res => {
				if (res.status === true) {
					res.data.token = res.token;
					res.data.id = res.data.uid;
					localStorage.setItem('current_user', JSON.stringify(res.data));
					this.redirect_to_home(true);
				}
				else {
					this.form_data = {
						login: '',
						password: ''
					}
					this.success = false;
					this.errors.push(this.app_strings['LBL_LOGIN_FAILED']);
				}
			});
		}
	}
}
