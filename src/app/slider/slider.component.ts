import { Component, OnInit } from '@angular/core';

@Component({
  selector: '.app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
	private images: string[] = [
		'/assets/slider/slider1.jpg',
		'/assets/slider/slider2.jpg',
		'/assets/slider/slider3.jpg',
		'/assets/slider/slider4.jpg',
		'/assets/slider/slider5.jpg'
	];
	private interval_id: any;
	private img: string;
	private count: number;

	constructor() { }

	ngOnInit() {
		this.count = 0;
		this.img = this.images[this.count];
		this.start_slider();
	}

	start_slider() {
		var obj = this;
		this.interval_id = setInterval(function() {
			obj.change_slide(1);
		}, 3000);
	}

	private change_slide(nb, manual = false) {
		if (manual)
			clearInterval(this.interval_id);
		if (this.count + nb > this.images.length - 1)
			this.count = 0;
		else if (this.count + nb < 0)
			this.count = this.images.length - 1;
		else
			this.count += nb;
		this.img = this.images[this.count];
		if (manual)
			this.start_slider();
	}
}
