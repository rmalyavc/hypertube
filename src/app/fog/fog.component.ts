import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: '.app-fog',
  templateUrl: './fog.component.html',
  styleUrls: ['./fog.component.css']
})
export class FogComponent implements OnInit {
	@Input() question:string;
	@Output() answer: EventEmitter<boolean> = new EventEmitter<boolean>();
	
	constructor() { }

	ngOnInit() {
		
	}

	return_answer(res) {
		this.answer.emit(res);
	}
}
