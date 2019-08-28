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

	constructor() { }

	ngOnInit() {
	
	}

	onPlayerReady(api:VgAPI, position: number = 0) {
		this.api = api;
		this.api.getDefaultMedia().play();
		this.api.getDefaultMedia().subscriptions.canPlay.subscribe(
	        () => {
	        	if (this.pos > 0) {
	        		this.api.getDefaultMedia().currentTime = this.pos - 100;
	        		this.pos = 0;
	        	}
	        	console.log('Can play fired');
	            // Set the video to the beginning
	            // this.api.getDefaultMedia().currentTime = 0;
	        }
	    );
	    // this.api.getDefaultMedia().subscriptions.canPlayThrough.subscribe(
	    //     (event) => {
	    //     	console.log('canPlayThrough', event);
	    //     }
	    // );
	    // this.api.getDefaultMedia().subscriptions.abort.subscribe(
	    //     () => {
	    //     	console.log('Aborted');
	    //     }
	    // );
	    // this.api.getDefaultMedia().subscriptions.error.subscribe(
	    //     (error) => {
	    //     	// this.film_data.video_link = this.film_data.video_link;
	    //     	console.log(error);
	    //     }
	    // );
	    // this.api.getDefaultMedia().subscriptions.seeking.subscribe(
	    //     (event) => {
	    //     	console.log('seeking', event);
	    //     }
	    // );
	    // this.api.getDefaultMedia().subscriptions.loadedData.subscribe(
	    //     (event) => {
	    //     	console.log('Loaded Data', event);	
	    //     }
	    // );
	    // this.api.getDefaultMedia().subscriptions.progress.subscribe(
	    //     (event) => {
	    //     	console.log('Progress', event);
	    //     	// this.film_data.video_link = this.film_data.video_link;	
	    //     }
	    // );
	    this.api.getDefaultMedia().subscriptions.ended.subscribe(
	        (event) => {
	        	var d = new Date();
				var n = d.getTime();
	        	console.log('ended', event);
	        	this.pos = this.api.getDefaultMedia().currentTime;
	        	this.film_data.sources = [{src: `${this.film_data.video_link}?n=${n}`, type: "video/mp4"}];
	        	setTimeout(() => {
	        		this.onPlayerReady(this.api, this.api.getDefaultMedia().currentTime);
	        	}, 1000);
	        	// this.api.getDefaultMedia().currentTime = curr_time;
	        	// console.log(this.api.getDefaultMedia());
	        	// this.api.getDefaultMedia().play();
	        }
	    );
	}
	// savePlayer(player) {
	//     this.player = player;
	//     console.log('player instance', player);
	// }
	// onStateChange(event) {
	//     console.log('player state', event.data);
	// }
}
