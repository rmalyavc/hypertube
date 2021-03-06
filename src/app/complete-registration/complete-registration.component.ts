import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-complete-registration',
  templateUrl: './complete-registration.component.html',
  styleUrls: ['./complete-registration.component.css']
})
export class CompleteRegistrationComponent extends BaseComponent implements OnInit {
	ngOnInit() {
		this.get_mod_strings('application', this.page_lang, () => {
			this.route.params.subscribe(params => {
				this.user_service.complete_registration(params['token']).subscribe(res => {
					if (res.status) {
						res.data.token = res.token;
						res.data.id = res.data.uid;
						localStorage.setItem('current_user', JSON.stringify(res.data));
						this.redirect_to_home(true);
					}
					else
						this.handle_request_error(false, this.app_strings['LBL_ERR_' + res.error] || this.app_strings.LBL_ERR_500);
				}, error => {
					this.handle_request_error();
				});
			});
		});
	}

}
