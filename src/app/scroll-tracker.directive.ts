import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[scrollTracker]',
})
export class ScrollTracker {
  @Output() scrolled = new EventEmitter<any>();

  @HostListener('scroll', ['$event'])
  onScroll(event) {
    let tracker = event.target;
    let endReached = false;
    let limit = tracker.scrollHeight - tracker.clientHeight;
    if (event.target.scrollTop > limit - 1) {
    	endReached = true;
    }

    this.scrolled.emit({
      pos: event.target.scrollTop,
      endReached
    })
  }
}