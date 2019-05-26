import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: '.app-film-details',
	templateUrl: './film-details.component.html',
	styleUrls: ['./film-details.component.css']
})
export class FilmDetailsComponent implements OnInit {
	@Input() private film_data: any;
	
	constructor() { }

	ngOnInit() {
		console.log(this.film_data);
	}

}
