import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';

declare var require: any

@Component({
	selector: '.app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends BaseComponent implements OnInit {
	private user_id: string;
	private page_user: any;
	public avatar: string = require('./assets/default/avatar.png');
	private form_data = {
		login: '',
		first_name: '',
		last_name: '',
		email: '',
		lang: '',
	};

	ngOnInit() {
		if (!this.current_user)
			this.router.navigate(['']);
		else {
			this.route.params.subscribe(params => {
				this.user_id = params['id'];
				this.user_service.get_current_user().subscribe(data => {
					this.page_user = data[this.user_id] || false;
					this.form_data = {
						login: this.page_user.login,
						first_name: this.page_user.first_name,
						last_name: this.page_user.last_name,
						email: this.page_user.email,
						lang: this.page_user.lang,
					};
					if (this.page_user.avatar != '') {
						console.log(data);
						this.avatar = data[this.user_id].avatar;
						console.log(this.avatar);
					}
				});
			});
		}
	}

}
