import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: '.app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends BaseComponent implements OnInit {
	private form_data;
  // constructor() { }

	ngOnInit() {
		this.form_data = {
			login: '',
			password: '',
			password_again: '',
			email: '',
		}
	}

	register() {
		this.router.navigate(['']);	
	}

}
