import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: '.app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {
	private form_data;

	ngOnInit() {
		this.form_data = {
			login: '',
			password: ''
		}
	}

	public login() {
		if (this.form_data['login'] && this.form_data['password']) {
			this.user_service.get_current_user().subscribe(function(data) {
				localStorage.setItem('current_user', JSON.stringify(data["42"]));
			});
			this.redirect_to_home(true);
		}
	}
	// login() {
	// 	this.router.navigate(['']);	
	// }
	
}
