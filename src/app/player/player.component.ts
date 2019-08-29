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

	onPlayerReady(api:VgAPI, test: boolean = false) {
		console.log('Ready');
		this.api = api;
		// this.api.getDefaultMedia().play();
		this.api.getDefaultMedia().subscriptions.canPlay.subscribe(
	        () => {
	        	if (test) {
	        		this.api.pause();
	        		this.wait_media();
	        	}
	        	else
	        		this.api.play();
	        	// document.querySelector('vg-buffering').style.display = 'block';
	        	// if (this.pos > this.api.getDefaultMedia().currentTime) {
	        	// 	this.api.getDefaultMedia().currentTime = this.pos + 1;
	        	// 	// this.pos = 0;
	        	// }
	        	// console.log('Can play fired');
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
	    this.api.getDefaultMedia().subscriptions.seeking.subscribe(
	        (event) => {
	        	if (this.api.getDefaultMedia().currentTime > 1)
		        	this.pos = this.api.getDefaultMedia().currentTime;
	        	// console.log('seeking', event);
	        	// console.log(this.api.getDefaultMedia().currentTime);
	        }
	    );
	    // this.api.getDefaultMedia().subscriptions.loadedData.subscribe(
	    //     (event) => {
	    //     	console.log('Loaded Data', event);	
	    //     }
	    // );
	    this.api.getDefaultMedia().subscriptions.progress.subscribe(
	        (event) => {
	        	// console.log('Progress', event);
	        	if (this.api.getDefaultMedia().currentTime > this.pos)
		        	this.pos = this.api.getDefaultMedia().currentTime;
		        // console.log(this.api.getDefaultMedia().buffer);
		        // console.log(this.api.getDefaultMedia().time);
	        	// this.film_data.video_link = this.film_data.video_link;	
	        }
	    );
	    this.api.getDefaultMedia().subscriptions.timeUpdate.subscribe(
	        (event) => {
	        	let time = this.api.getDefaultMedia().time;
	        	if (this.api.getDefaultMedia().time.current == 0)
	        		this.api.pause();
	        	else if (time.total - time.current > 1000)
	        		this.pos = time.current;
	        	// console.log('timeUpdate');
	        	// console.log(this.api.getDefaultMedia().time);
	        }
	    );
	    this.api.getDefaultMedia().subscriptions.ended.subscribe(
	        (event) => {
	        	console.log(this.api.getDefaultMedia().time);
	        	console.log('ended', event);
	        	console.log(this.api.getDefaultMedia().buffer);
	        	let time = this.api.getDefaultMedia().time;
	        	if (this.pos < time.total - 1000)
	        		this.wait_media();
	        }
	    );
	}

	wait_media() {
		var d = new Date();
		var n = d.getTime();
		var buffer = this.api.getDefaultMedia().buffer;
		var tmp = 0;
    	let time = this.api.getDefaultMedia().time;
    	if (this.pos < time.total - 1000) {
    		this.api.getDefaultMedia().currentTime = this.pos / 1000;
    		this.api.pause();
    		(<HTMLElement>document.querySelector('vg-buffering')).style.display = 'block';
    		var interval_id = setInterval(() => {
    			console.log(buffer.end, this.pos);
    			if (buffer.end >= this.pos) {
    				clearInterval(interval_id);
    				(<HTMLElement>document.querySelector('vg-buffering')).style.display = 'none';
    				this.onPlayerReady(this.api);
    				// this.api.play();
    			}
    			else if (tmp >= buffer.end) {
    				this.film_data.sources = [{src: `${this.film_data.video_link}?n=${n}`, type: "video/mp4"}];
    				clearInterval(interval_id);
    			}
    			else
    				tmp = buffer.end;
    		}, 200);
    	}
	}
	// savePlayer(player) {
	//     this.player = player;
	//     console.log('player instance', player);
	// }
	// onStateChange(event) {
	//     console.log('player state', event.data);
	// }
}
