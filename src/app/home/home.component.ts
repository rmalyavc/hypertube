import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent implements OnInit {
	load_more: Subject<boolean> = new Subject();
	ngOnInit() {
		if (!this.current_user)
			this.redirect_to('login', true);
		else
			this.check_login();
		this.get_mod_strings('application');
	}

	handle_scroll(event) {
		let tracker = event.target;
		let limit = tracker.scrollHeight - tracker.clientHeight;

	    if (event.target.scrollTop >= limit - 1) {
			this.load_more.next(true);
		}
	}
}
