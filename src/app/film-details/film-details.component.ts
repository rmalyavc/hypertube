import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
	selector: '.app-film-details',
	templateUrl: './film-details.component.html',
	styleUrls: ['./film-details.component.css']
})
export class FilmDetailsComponent extends BaseComponent implements OnInit {
	@Input() private film_data: any;
	
	// constructor() { }

	ngOnInit() {
		this.get_mod_strings();
		console.log(this.film_data);
	}

}
