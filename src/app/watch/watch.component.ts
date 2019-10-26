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

	constructor(
			public http: HttpClient,
			public user_service: UserService,
			public router: Router,
			public route: ActivatedRoute,
			public lang_service: LangService,
			public film_service: FilmService
		) {
		super(user_service, router, route, lang_service);
	}

	ngOnInit() {
		this.get_mod_strings('application', this.page_lang, () => {
			this.route.params.subscribe(params => {
				this.page_id = params['id'];
				this.film_service.get_film(this.page_id).subscribe(res => {
					this.film_data.video_link = "";
					this.film_data.trailer_header = this.app_strings.LBL_VIDEO_NOT_AVAILABLE;
					this.film_data.has_trailer = false;
					this.film_data.has_video = false;
					this.film_data.id = res['id'];
					this.film_data.name = res['title'];
					this.film_data.img = this.no_img;
					if (res['poster_path'])
						this.film_data.img = this.film_service.config.images.base_url + 'original' + res['poster_path'];
					this.film_data.link = "";
					this.film_data.description = res['overview'];
					this.film_data.genres = res['genres'];
					this.film_data.year = res['release_date'];
					this.film_data.has_torrents = false;
					if (res['videos']['results'] && res['videos']['results'].length > 0) {
						let video_res = res['videos']['results'][0];
						this.film_data.trailer_header = video_res.name;
						this.film_data.trailer_id = video_res.key;
						this.film_data.has_trailer = true;
					}
					this.film_service.get_torrent(res['imdb_id']).subscribe(t_res => {
						if (t_res['status'] == 'ok' && t_res['data']['movies'] && t_res['data']['movies'][0]) {
							let movie = t_res['data']['movies'][0];
							this.film_data.has_torrents = true;
							if (movie.torrents && movie.torrents[0]) {
								this.film_service.get_video(res['id'], movie.torrents[0]['hash']).subscribe(video => {
									var d = new Date();
  									var n = d.getTime();
									if (video.status) {
										this.film_data.has_video = true;
										this.film_data.video_link = `http://localhost:3000/${video.data.path}`;
										this.film_data.percentage = video.data.percentage;
										this.film_data.player_header = `${this.app_strings.LBL_WATCH} ${this.film_data.name}`;
										this.film_service.get_subtitles(this.page_lang.toLowerCase(), video.data.path, res['imdb_id'], res['id']).subscribe(result => {
											this.film_data.sources = [{src: `${this.film_data.video_link}?v=${n}`, type: "video/mp4"}];
											if (result.status) {
												this.film_data.subtitles = [{
													src: `http://localhost:3000/${result.data}`,
													lang: this.app_strings[`LBL_${this.page_lang}`],
													name: this.page_lang
												}];
											}
											else {
												this.handle_request_error();
											}
										});
									}
								});
							}
							else
								this.film_data.player_header = this.app_strings.LBL_VIDEO_NOT_AVAILABLE;
						}
						else
							this.film_data.player_header = this.app_strings.LBL_VIDEO_NOT_AVAILABLE;
					});

					if (this.current_user) {
						this.film_service.save_visit(this.film_data, this.current_user).subscribe(res => {
							if (!res.status)
								this.handle_request_error(false, this.app_strings['LBL_ERR_' + res.error] || this.app_strings.LBL_ERR_500);
						}, error => {
							this.handle_request_error();
						});
					}
				}, error => {
					this.handle_request_error();
				});
			});
		});
	}
}
