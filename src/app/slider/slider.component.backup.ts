import { Component, OnInit } from '@angular/core';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { trigger, state, transition, style, animate, group, query } from '@angular/animations';

@Component({
	selector: '.app-slider',
	templateUrl: './slider.component.html',
	styleUrls: ['./slider.component.css'],
	animations: [
		// trigger('prev_slide', [
			// transition('void => prev', [
			// 	style({transform: 'translateX(100%)'}),
			// 	animate('0.2s ease-out')
			// ]),
			// transition('void => next', [
			// 	style({transform: 'translateX(-100%)'}),
			// 	animate('0.2s ease-out')
			// ]),
			// transition('prev => void', [
			// 	animate('0.2s ease-out', style({transform: 'translateX(-100%)'}))
			// ]),
			// transition('next => void', [
			// 	animate('0.2s ease-out', style({transform: 'translateX(100%)'}))
			// ]),
			trigger('prev_slide', [
				state('prev', style({
			    	transform: 'translateX(-100%)'
			    })),
			    state('next', style({
		        	transform: 'translateX(100%)'
			    })),
			    state('still', style({
		        	transform: 'translateX(0%)'
			    })),
			    transition('next=>still', animate('0.4s')),
	    		transition('prev=>still', animate('0.4s'))
			])
		// ])
	]
})
export class SliderComponent extends SearchResultsComponent implements OnInit {
	private interval_id: any;
	private count: number = 0;
	private curr_set: any = [];
	private state_name: string = 'still';
	private curr_index: number = 0;
	private range: number[] = [];

	ngOnInit() {
		this.film_service.lang = this.page_lang;
		this.get_mod_strings('application', this.page_lang, () => {
			this.film_service.search_movies().subscribe(res => {
				for (var i = 0; i < res.results.length; i++) {
					if (res.results[i].poster_path)
						res.results[i].img = this.film_service.config.images.base_url + 'original' + res.results[i].poster_path;
					else
						res.results[i].img = this.no_img;
				}
				this.results = res.results.slice(0, 20);
				this.start_slider();
			}, error => {
				this.handle_request_error();
			});
		});
	}

	start_slider() {
		var obj = this;
		this.range = [];
		for (var i = this.count; i < this.count + 4; i++) {
			console.log(i);
			this.range.push(i);
		}
		// this.curr_set = this.results.slice(this.count, this.count + 4);
		this.interval_id = setInterval(function() {
			obj.change_slide(4);
		}, 5000);
	}

	private change_slide(nb, manual = false) {
		// if (nb < 0)
		// 	this.state_name = 'prev';
		// else
		// 	this.state_name = 'next';
		// setTimeout(() => {
		// 	this.state_name = 'still';
		// }, 0);
		this.curr_set = [];
		this.range = [];
		setTimeout(() => {
			if (manual)
				clearInterval(this.interval_id);
			if (this.count + nb > this.results.length - 1)
				this.count = 0;
			else if (this.count + nb < 0)
				this.count = this.results.length - 4;
			else
				this.count += nb;
			// this.curr_set = this.results.slice(this.count, this.count + 4);
			if (nb < 0)
				this.state_name = 'prev';
			else
				this.state_name = 'next';
			setTimeout(() => {
				this.state_name = 'still';
			}, 400);
			if (manual)
				this.start_slider();
			else {
				for (var i = this.count; i < this.count + 4; i++) {
					this.range.push(i);
				}
			}
		}, 250);
	}
}
