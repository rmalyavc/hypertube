import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { LangService } from '../lang.service';
import { FilmService } from '../film.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var require: any;

@Component({
	selector: 'app-watch',
	templateUrl: './watch.component.html',
	styleUrls: ['./watch.component.css']
})
export class WatchComponent extends BaseComponent implements OnInit {
	private page_id: string;
	private film_data: any = {};
	public no_img: string = require('../search-results/assets/no_image.png');

	constructor(private http: HttpClient, public user_service: UserService, public router: Router, public route: ActivatedRoute, public lang_service: LangService, public film_service: FilmService) {
		super(user_service, router, route, lang_service);
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.page_id = params['id'];
			this.film_service.get_film(this.page_id).subscribe(res => {
				this.film_data.id = res['id'];
				this.film_data.name = res['title'];
				this.film_data.img = this.no_img;
				if (res['poster_path'])
					this.film_data.img = this.film_service.config.images.base_url + 'original' + res['poster_path'];
				this.film_data.link = "";
				this.film_data.description = res['overview'];
				this.film_data.genres = res['genres'];
				this.film_data.year = res['release_date'];
				if (this.current_user) {
					this.film_service.save_visit(this.film_data, this.current_user).subscribe(res => {});
				}
			});
		});	
	}
}
