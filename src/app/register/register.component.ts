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
	};
	private result: any;

	ngOnInit(res: any = false) {
		this.result = res;
		this.get_mod_strings('application');
	}

	register() {
		this.result = this.user_service.register_user(this.form_data).subscribe(data => {
			this.ngOnInit(data);
		});
	}

}
