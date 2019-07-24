import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: '.app-history',
  templateUrl: './history.component.html',
  styleUrls: ['../profile/profile.component.css', './history.component.css']
})
export class HistoryComponent extends ProfileComponent implements OnInit {
	private limit: number = 20;
	private skip: number = 0;
	private filters = {
		sort_order: 'DESC',
		order_by: 'updated_at'
	};
	private sort_order: string = 'DESC';
	private order_by: string = 'updated_at';

  	ngOnInit() {
  		this.get_mod_strings();
  		this.history = [];
  		this.skip = 0;
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
					this.get_brawsing_history(this.limit, this.skip, this.filters.order_by, this.filters.sort_order);
				});
				console.log(this);
			});
		}
	}
	handle_scroll(event) {
		let tracker = event.target;
		let limit = tracker.scrollHeight - tracker.clientHeight;

	    if (event.target.scrollTop >= limit - 1) {
			this.skip += 20;
			this.get_brawsing_history(this.limit, this.skip, this.filters.order_by, this.filters.sort_order);
	    }
	}
}
