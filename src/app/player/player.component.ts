import { Component, OnInit, Input } from '@angular/core';
import {VgAPI} from 'videogular2/core';

declare var require: any

@Component({
	selector: '.app-player',
	templateUrl: './player.component.html',
	styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
	@Input() private film_data: any;
	// private play = require('./assets/play.png');

	private preload:string = 'auto';
    private api: VgAPI;
    private pos: number = 0;
    public display_buffering: boolean = false;
    private timeout: number = 0;
    private time_updates: number = 0;
    private ended_times: number = 0;

	constructor() { }

	ngOnInit() {
	
	}

	onPlayerReady(api:VgAPI) {
		this.api = api;
		console.log('this is test can play - ' + this.pos);
		// this.api.play();
		// this.api.getDefaultMedia().currentTime = this.pos / 1000;
		this.api.getDefaultMedia().currentTime = 100;
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
	        	let time = this.api.getDefaultMedia().time;
	        	this.display_buffering = false;
	        	this.time_updates++;
	        	if (time.total - time.current > 1000 && time.current > this.pos) {
	        		this.pos = time.current;
	        		if (this.timeout > 0 && this.time_updates > 5) {
	        			this.timeout = 0;
	        			console.log('Zero timeout');
	        		}
	        	}
	        }
	    );
	    this.api.getDefaultMedia().subscriptions.ended.subscribe(event => {
	    		console.log('ENDED');
	        	let time = this.api.getDefaultMedia().time;
	        	this.time_updates = 0;
	        	if (this.pos < time.total - 1000) {
	        		this.display_buffering = true;
	        		// this.ended_times++;
	        		if (this.timeout < 10000)
		        		this.timeout += 1000;
	        		console.log(`TIMEOUT + ${this.timeout}`);
	    			setTimeout(() => {
	        			this.wait_media();
	        		}, this.timeout);
	        	}
	        }
	    );
	    this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(event => {
	    		console.log('Loadedmetadata');
	    		this.api.getDefaultMedia().currentTime = this.pos / 1000;
	    		this.api.play();
	        }
	    );
	    this.api.getDefaultMedia().subscriptions.canPlayThrough.subscribe(event => {
	    		console.log('canplaythrough');
	        }
	    );
	}

	wait_media() {
		var d = new Date();
		var n = d.getTime();
		var buffer = this.api.getDefaultMedia().buffer;
    	let time = this.api.getDefaultMedia().time;
    	this.film_data.sources = [{src: `${this.film_data.video_link}?n=${n}`, type: "video/mp4"}];
    	// setTimeout(() => {
    	// 	this.api.play();
    	// }, 0);

    	// this.api.getDefaultMedia().currentTime = 100;
    	// console.log(this.api.getDefaultMedia().currentTime);
    	// this.onPlayerReady(this.api);
	}
	// savePlayer(player) {
	//     this.player = player;
	//     console.log('player instance', player);
	// }
	// onStateChange(event) {
	//     console.log('player state', event.data);
	// }
}
