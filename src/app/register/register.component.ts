import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: '.app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends BaseComponent implements OnInit {
	private form_data = {
		login: '',
		password: '',
		password_confirmation: '',
		email: '',
		lang: ''
	};
	private result: any;

	ngOnInit(res: any = false) {
		this.form_data.lang = this.page_lang;
		this.result = res;
		this.get_mod_strings('application');
	}

	register() {
		this.result = this.user_service.register_user(this.form_data).subscribe(data => {
			if (data.errors) {
				var tmp;
				var keys = Object.keys(data.errors);
				for (var i = 0; i < keys.length; i++) {
					for (var j = 0; j < data.errors[keys[i]].length; j++) {
						tmp = data.errors[keys[i]][j];
						this.errors.push(tmp);
					}
				}
			}
			this.ngOnInit(data);
		}, error => {
			this.handle_request_error();
		});
	}
}
