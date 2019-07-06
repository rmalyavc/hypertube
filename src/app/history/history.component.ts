import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: '.app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent extends ProfileComponent implements OnInit {
	private limit: number = 20;
	private skip: number = 0;

  	ngOnInit() {
	  	if (!this.current_user)
			this.router.navigate(['']);
		else {
			this.check_login();
			this.route.params.subscribe(params => {
				this.user_id = params['id'];
				this.user_service.get_user_profile(this.user_id, this.current_user).subscribe(res => {
					this.page_user = res.data || false;
					if (this.page_user)
						this.page_user.id = this.page_user.uid;
					this.get_brawsing_history(this.limit, this.skip);
				});
				console.log(this);
			});
		}
	}
}
