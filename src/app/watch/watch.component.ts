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
	private film_data: any = {};

	constructor(private http: HttpClient, public user_service: UserService, public router: Router, public route: ActivatedRoute, public lang_service: LangService, private film_service: FilmService) {
		super(user_service, router, route, lang_service);
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.page_id = params['id'];
			this.film_service.get_film(this.page_id).subscribe(res => {
				this.film_data.id = res.data.movie.id;
				this.film_data.name = res.data.movie.title_long;
				this.film_data.lang = res.data.movie.language;
				this.film_data.img = res.data.movie.large_cover_image;
				this.film_data.link = "";
				this.film_data.description = res.data.movie.description_intro;
				this.film_data.genres = res.data.movie.genres;
				this.film_data.year = res.data.movie.year;
				this.film_service.get_comments(this.page_id).subscribe(result => {
					console.log(result);
				});
			});
		});	
	}
}
