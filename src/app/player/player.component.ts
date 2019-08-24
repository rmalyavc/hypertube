import { Component, OnInit, Input } from '@angular/core';

declare var require: any

@Component({
	selector: '.app-player',
	templateUrl: './player.component.html',
	styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
	@Input() private film_data: any;
	private play = require('./assets/play.png');
	// public player: YT.Player;
 //  	private id: string = 'qDuKsiwS5xw'
	constructor() { }

	ngOnInit() {
		
	}
	// savePlayer(player) {
	//     this.player = player;
	//     console.log('player instance', player);
	// }
	// onStateChange(event) {
	//     console.log('player state', event.data);
	// }
}
