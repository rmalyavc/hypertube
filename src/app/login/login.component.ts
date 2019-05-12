import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: '.app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {
	private form_data;
	private success: boolean;

	ngOnInit() {
		this.form_data = {
			login: '',
			password: ''
		}
	}

	public login() {
		console.log(this.form_data);
		if (this.form_data['login'] && this.form_data['password']) {
			this.user_service.get_current_user().subscribe(function(data) {
				localStorage.setItem('current_user', JSON.stringify(data["42"]));
			});
			this.redirect_to_home(true);
			// this.user_service.login_user(this.form_data).subscribe(data => {
			// 	console.log(data);
			// 	if (data.success === true) {
			// 		delete data['success'];
			// 		localStorage.setItem('current_user', JSON.stringify(data));
			// 		this.redirect_to_home(true);
			// 	}
			// 	else {
			// 		this.form_data = {
			// 			login: '',
			// 			password: ''
			// 		}
			// 		this.success = false;
			// 	}
			// });
		}
	}
	// login() {
	// 	this.router.navigate(['']);	
	// }
	
}
