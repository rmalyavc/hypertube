import { Component, OnInit, Input } from '@angular/core';
import {VgAPI} from 'videogular2/core';
import { FilmService } from '../film.service';

declare var require: any

@Component({
	selector: '.app-player',
	templateUrl: './player.component.html',
	styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
	@Input() private film_data: any;

	private preload:string = 'auto';
    private api: VgAPI;
    private pos: number = 0;
    public display_buffering: boolean = false;
    private timeout: number = 1000;
    private time_updates: number = 0;
    private ended_times: number = 0;

	constructor(private film_service: FilmService) { }

	ngOnInit() {
	}

	onPlayerReady(api:VgAPI, test: boolean = false) {
		this.api = api;
	    this.api.getDefaultMedia().subscriptions.seeking.subscribe(
	        (event) => {
	        	let time = this.api.getDefaultMedia().time;
	        	if (this.api.getDefaultMedia().currentTime > 1) {
	        		this.pos = time.current;
	        	}
	        }
	    );
	    this.api.getDefaultMedia().subscriptions.timeUpdate.subscribe(
	        (event) => {
	        	if (this.api.getDefaultMedia()) {
		        	let time = this.api.getDefaultMedia().time;
		        	if (this.api.getDefaultMedia().time.current == 0)
		        		this.api.pause();
		        	else if (time.total - time.current > 1000) {
		        		this.pos = time.current;
		        	}
	        	}
	        }
	    );
	    this.api.getDefaultMedia().subscriptions.ended.subscribe(
	        (event) => {
	        	console.log('ended', event);
	        	let time = this.api.getDefaultMedia().time;
	        	this.time_updates = 0;
	        	if (this.pos < time.total - 1000) {
	        		this.display_buffering = true;
	        		setTimeout(() => {
        				this.wait_media();
	        		}, this.timeout);
	        	}
	        }
	    );
	    this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(event => {
	    		this.display_buffering = false;
	    		this.api.getDefaultMedia().currentTime = this.pos / 1000;
	    		this.api.play();
	        }
	    );
	    // this.api.getDefaultMedia().subscriptions.canPlayThrough.subscribe(event => {
	    // 		let time = this.api.getDefaultMedia().time;
	    //     	if (this.pos < time.total - 1000)
	    //     		this.wait_media();
	    //     }
	    // );
	}

	wait_media() {
		var d = new Date();
		var n = d.getTime();
		var buffer = this.api.getDefaultMedia().buffer;
		var tmp = 0;
		var count = 0;
    	let time = this.api.getDefaultMedia().time;

    	this.film_service.check_percentage(this.film_data.id).subscribe(res => {
    		this.film_data.percentage = res.data.percentage;
    		let curr_perc = (this.pos / time.total) * 100;
    		console.log(res, `POS - ${this.pos}`, `TOTAL - ${time.total}`, 'Current PERCENTAGE - ' + (this.pos / time.total * 100));
    		if (curr_perc < res.data.percentage - 2 ||
    			(res.data.percentage >= 98 && curr_perc < res.data.percentage)) {
    			this.film_data.sources = [{src: `${this.film_data.video_link}?n=${n}`, type: "video/mp4"}];
    		}
    		else {
    			setTimeout(() => {
    				this.wait_media();
        		}, this.timeout);
    		}
    	});
	}
}
