import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: '.app-fog',
  templateUrl: './fog.component.html',
  styleUrls: ['./fog.component.css']
})
export class FogComponent extends BaseComponent implements OnInit {
	@Input() question:string;
	@Output() answer: EventEmitter<boolean> = new EventEmitter<boolean>();
	
	// constructor() { }

	ngOnInit() {
		
	}

	return_answer(res) {
		this.answer.emit(res);
	}
}
