import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: '.app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends BaseComponent implements OnInit {
	private form_data;
	private result: any;

	ngOnInit(res: any = false) {
		this.form_data = {
			login: '',
			password: '',
			password_confirmation: '',
			email: '',
		}
		this.result = res;
	}

	register() {
		this.result = this.user_service.register_user(this.form_data).subscribe(data => {
			console.log(data);
			this.ngOnInit(data);
		});
	}

}
