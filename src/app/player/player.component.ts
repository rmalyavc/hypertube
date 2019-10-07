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
	// private play = require('./assets/play.png');

	private preload:string = 'auto';
    private api: VgAPI;
    private pos: number = 0;
<<<<<<< HEAD
    public display_buffering: boolean = false;
    private timeout: number = 1000;
    private time_updates: number = 0;
    private ended_times: number = 0;
=======
    private display_buffering: boolean = false;
>>>>>>> parent of 32d558c5... Seeking works finally

	constructor(private film_service: FilmService) { }

	ngOnInit() {
	
	}

	onPlayerReady(api:VgAPI, test: boolean = false) {
		console.log('Ready');
		this.api = api;
		if (test) {
    		this.api.pause();
    		this.wait_media();
    	}
    	else {
    		console.log('this is test can play');
    		this.api.getDefaultMedia().currentTime = this.pos / 1000;
    		// this.pos = 0;
    		this.api.play();
    	}
		// this.api.getDefaultMedia().play();
		// this.api.getDefaultMedia().subscriptions.canPlay.subscribe(
	 //        () => {

	 //        	// document.querySelector('vg-buffering').style.display = 'block';
	 //        	// if (this.pos > this.api.getDefaultMedia().currentTime) {
	 //        	// 	this.api.getDefaultMedia().currentTime = this.pos + 1;
	 //        	// 	// this.pos = 0;
	 //        	// }
	 //        	// console.log('Can play fired');
	 //            // Set the video to the beginning
	 //            // this.api.getDefaultMedia().currentTime = 0;
	 //        }
	 //    );
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
	        	let time = this.api.getDefaultMedia().time;
	        	if (this.api.getDefaultMedia().currentTime > 1) {
	        		this.pos = time.current;
		        	// this.pos = this.api.getDefaultMedia().currentTime;
	        	}
	        	// console.log('seeking', event);
	        	// console.log(this.api.getDefaultMedia().currentTime);
	        }
	    );
	    // this.api.getDefaultMedia().subscriptions.loadedData.subscribe(
	    //     (event) => {
	    //     	console.log('Loaded Data', event);	
	    //     }
	    // );
	    // this.api.getDefaultMedia().subscriptions.progress.subscribe(
	    //     (event) => {
	    //     	// console.log('Progress', event);
	    //     	if (this.api.getDefaultMedia().currentTime > this.pos)
		   //      	this.pos = this.api.getDefaultMedia().currentTime;
		   //      // console.log(this.api.getDefaultMedia().buffer);
		   //      // console.log(this.api.getDefaultMedia().time);
	    //     	// this.film_data.video_link = this.film_data.video_link;	
	    //     }
	    // );
	    this.api.getDefaultMedia().subscriptions.timeUpdate.subscribe(
	        (event) => {
	        	let time = this.api.getDefaultMedia().time;
	        	if (this.api.getDefaultMedia().time.current == 0)
	        		this.api.pause();
	        	else if (time.total - time.current > 1000 && time.current > this.pos) {
	        		console.log(time.total - time.current, time.total, time.current);
	        		this.pos = time.current;
<<<<<<< HEAD
	        		// if (this.timeout > 0 && this.time_updates > 5) {
	        		// 	this.timeout = 0;
	        		// 	console.log('Zero timeout');
	        		// }
=======
>>>>>>> parent of 32d558c5... Seeking works finally
	        	}
	        	// console.log('timeUpdate');
	        	// console.log(this.api.getDefaultMedia().time);
	        }
	    );
	    this.api.getDefaultMedia().subscriptions.ended.subscribe(
	        (event) => {
	        	// console.log(this.api.getDefaultMedia().time);
	        	console.log('ended', event);
	        	// console.log(`POS + (${this.pos})`);
	        	// console.log(this.api.getDefaultMedia().buffer);
	        	let time = this.api.getDefaultMedia().time;
<<<<<<< HEAD
	        	this.time_updates = 0;
	        	if (this.pos < time.total - 1000) {
	        		this.display_buffering = true;
	        		// this.ended_times++;
	        		// if (this.timeout < 10000)
		        	// 	this.timeout += 1000;
	        		console.log(`TIMEOUT + ${this.timeout}`);
	    			setTimeout(() => {
	        			this.wait_media();
	        		}, this.timeout);
	        	}
	        }
	    );
	    this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(event => {
	    		console.log('Loadedmetadata');
	    		this.display_buffering = false;
	    		this.api.getDefaultMedia().currentTime = this.pos / 1000;
	    		this.api.play();
	        }
	    );
	    this.api.getDefaultMedia().subscriptions.canPlayThrough.subscribe(event => {
	    		console.log('canplaythrough');
=======
	        	console.log(this.pos, time.total);
	        	if (this.pos < time.total - 1000)
	        		this.wait_media();
>>>>>>> parent of 32d558c5... Seeking works finally
	        }
	    );
	}

	wait_media() {
		var d = new Date();
		var n = d.getTime();
		var buffer = this.api.getDefaultMedia().buffer;
		var tmp = 0;
		var count = 0;
    	let time = this.api.getDefaultMedia().time;
<<<<<<< HEAD
    	this.film_service.check_percentage(this.film_data.id).subscribe(res => {
    		this.film_data.percentage = res.data.percentage;
    		console.log(res);
    		if (this.pos / time.total * 100 <= this.film_data.percentage) {
    			this.film_data.sources = [{src: `${this.film_data.video_link}?n=${n}`, type: "video/mp4"}];
    		}
    		else {
    			this.wait_media();
    		}
    	});
    	// setTimeout(() => {
    	// 	this.api.play();
    	// }, 0);

    	// this.api.getDefaultMedia().currentTime = 100;
    	// console.log(this.api.getDefaultMedia().currentTime);
    	// this.onPlayerReady(this.api);
=======
    	if (this.pos < time.total - 1000) {
    		this.display_buffering = true;
    		this.api.pause();
    		// this.api.getDefaultMedia().currentTime = this.pos / 1000;
    		// (<HTMLElement>document.querySelector('vg-buffering')).style.display = 'block';
    		var interval_id = setInterval(() => {
    			console.log(`Buffer end = (${buffer.end})`, `POS = (${this.pos})`, `TMP = (${tmp})`);
    			if (buffer.end >= this.pos) {
    				clearInterval(interval_id);
    				this.display_buffering = false;
    				// (<HTMLElement>document.querySelector('vg-buffering')).style.display = 'none';
    				this.onPlayerReady(this.api);
    			}
    			else if (tmp > buffer.end || (tmp == buffer.end && count > 2)) {
    				count = 0;
    				clearInterval(interval_id);
    				this.film_data.sources = [{src: `${this.film_data.video_link}?n=${n}`, type: "video/mp4"}];
    				this.onPlayerReady(this.api, true);
    			}
    			else {
    				tmp = buffer.end;
    				count++;
    			}
    		}, 1000);
    	}
>>>>>>> parent of 32d558c5... Seeking works finally
	}
	// savePlayer(player) {
	//     this.player = player;
	//     console.log('player instance', player);
	// }
	// onStateChange(event) {
	//     console.log('player state', event.data);
	// }
}
