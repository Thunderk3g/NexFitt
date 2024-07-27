import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-swipe-card',
  templateUrl: './swipe-card.component.html',
  styleUrls: ['./swipe-card.component.css']
})
export class SwipeCardComponent {
  @Input() item: any;
  @Output() swiped = new EventEmitter<string>();

  onSwipe(direction: string) {
    this.swiped.emit(direction);
  }
}
