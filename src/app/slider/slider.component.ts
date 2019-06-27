import { Component, OnInit } from '@angular/core';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { trigger, state, transition, style, animate, group, query } from '@angular/animations';

@Component({
	selector: '.app-slider',
	templateUrl: './slider.component.html',
	styleUrls: ['./slider.component.css'],
	animations: [
		trigger('prev_slide', [
			transition('void => prev', [
				style({transform: 'translateX(100%)'}),
				animate('0.2s ease-out')
			]),
			transition('void => next', [
				style({transform: 'translateX(-100%)'}),
				animate('0.2s ease-out')
			]),
			transition('prev => void', [
				animate('0.2s ease-out', style({transform: 'translateX(-100%)'}))
			]),
			transition('next => void', [
				animate('0.2s ease-out', style({transform: 'translateX(100%)'}))
			]),
		])
	]
})
export class SliderComponent extends SearchResultsComponent implements OnInit {
	private interval_id: any;
	private count: number = 0;
	private curr_set: any = [];
	private state_name: string = 'next';
	private curr_index: number = 0;

	// constructor(private search_service: SearchService) { }

	ngOnInit() {
		this.results = this.search_service.get_results(false, 'download_count').subscribe(res => {
			this.results = res;

			this.start_slider();
		});
	}

	start_slider() {
		var obj = this;
		this.curr_set = this.results.data.movies.slice(this.count, this.count + 4);
		this.interval_id = setInterval(function() {
			obj.change_slide(4);
		}, 5000);
	}

	private change_slide(nb, manual = false) {
		if (nb < 0)
			this.state_name = 'prev';
		else
			this.state_name = 'next';
		
		this.curr_set = [];
		setTimeout(() => {
			if (manual)
				clearInterval(this.interval_id);
			if (this.count + nb > this.results.data.movies.length - 1)
				this.count = 0;
			else if (this.count + nb < 0)
				this.count = this.results.data.movies.length - 4;
			else
				this.count += nb;
			this.curr_set = this.results.data.movies.slice(this.count, this.count + 4);
			if (manual)
				this.start_slider();
		}, 250);
	}
}
