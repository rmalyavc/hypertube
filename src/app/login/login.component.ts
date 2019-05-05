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

	login() {
		this.router.navigate(['']);	
	}
	
}
