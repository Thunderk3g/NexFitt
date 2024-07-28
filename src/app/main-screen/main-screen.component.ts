import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {
  items = [
    { name: 'Item 1', image: 'https://via.placeholder.com/300', price: 100 },
    { name: 'Item 2', image: 'https://via.placeholder.com/300', price: 200 },
    { name: 'Item 3', image: 'https://via.placeholder.com/300', price: 300 },
    // Add more items as needed
  ];
  currentIndex = 0;

  constructor() {}

  ngOnInit(): void {}

  onRotateNext(): void {
    if (this.currentIndex < this.items.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Loop back to the start
    }
  }

  onRotatePrevious(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.items.length - 1; // Loop back to the end
    }
  }

  onPickUp(): void {
    console.log('Picked up');
  }

  onDrop(): void {
    console.log('Dropped');
  }
}
