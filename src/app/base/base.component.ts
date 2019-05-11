import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-base',
	template: ``,
	styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
	public project_name = 'Hypertube';
	public creators = ['rmalyavc,', 'dkliukin'];
	public current_user: any;

	constructor(public user_service: UserService, public router: Router, public route: ActivatedRoute) {
		this.current_user = JSON.parse(localStorage.getItem('current_user') || 'false');
	}

	ngOnInit() {
		
	}

	public redirect_to_login() {
		this.router.navigate(['login']);
	}

	public redirect_to_home(reload = false) {
		this.router.navigate(['']);
		if (reload)
			window.location.href = '/';
	}

	public logout() {
		localStorage.removeItem('current_user');
		this.current_user = false;
		window.location.href = '/login';
	}
}
