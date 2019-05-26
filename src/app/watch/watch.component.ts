import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { LangService } from '../lang.service';
import { FilmService } from '../film.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-watch',
	templateUrl: './watch.component.html',
	styleUrls: ['./watch.component.css']
})
export class WatchComponent extends BaseComponent implements OnInit {
	private page_id: string;
	private film_data: any = false;

	constructor(private http: HttpClient, public user_service: UserService, public router: Router, public route: ActivatedRoute, public lang_service: LangService, private film_service: FilmService) {
		super(user_service, router, route, lang_service);
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.page_id = params['id'];
			this.film_service.get_film(this.page_id).subscribe(film => {
				this.film_data = film;
			});
		});	
	}
}
