import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
	selector: '.app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends BaseComponent implements OnInit {
	private user_id: string;
	private page_user: any;

	ngOnInit() {
		if (!this.current_user)
			this.router.navigate(['']);
		else {
			this.route.params.subscribe(params => {
				this.user_id = params['id'];
				this.user_service.get_current_user().subscribe(data => {
					this.page_user = data[this.user_id] || false;
				});
			});
		}
	}

}
