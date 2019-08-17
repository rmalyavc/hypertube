import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { trigger, state, transition, style, animate, group, query } from '@angular/animations';

@Component({
  selector: '.app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  animations: [
		trigger('notification_container', [
			state('hidden', style({
		    	opacity: 0
		    })),
		    state('visible', style({
	        	opacity: 1
		    })),
		    transition('hidden=>visible', animate('0.5s')),
    		transition('visible=>hidden', animate('0.5s'))
		])
	]
})
export class NotificationsComponent extends BaseComponent implements OnInit {
	private qty: number = 0;
	private notifications: object[] = [];
	private show_notifications: boolean = false;
	private current_state: string = 'hidden';

	ngOnInit() {
		this.get_mod_strings('application', this.page_lang, () => {
			this.get_mod_strings('NotificationComponent', this.page_lang, () => {
				this.get_notifications();
			});
		});
	}
	get_notifications() {
		this.user_service.get_notifications(this.current_user).subscribe(res => {
			console.log(res);
			if (res.status) {
				this.notifications = res.data
				this.qty = this.notifications.length;
			}
		});
	}
	show_hide() {
		this.show_notifications = !this.show_notifications;
		this.current_state = (this.current_state == 'hidden' && this.qty > 0) ? 'visible' : 'hidden';
	}

	remove_notification(id) {
		this.notifications = this.notifications.filter(el => {
			return el['id'] != id;
		});
		this.qty = this.notifications.length;
		if (this.qty == 0)
			this.show_hide();
	}
}
