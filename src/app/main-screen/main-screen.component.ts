import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {
  allItems = [
    { name: 'Item 1', image: 'https://via.placeholder.com/300', price: 100 },
    { name: 'Item 2', image: 'https://via.placeholder.com/300', price: 200 },
    { name: 'Item 3', image: 'https://via.placeholder.com/300', price: 300 },
    { name: 'Item 4', image: 'https://via.placeholder.com/300', price: 400 },
    { name: 'Item 5', image: 'https://via.placeholder.com/300', price: 500 },
    { name: 'Item 6', image: 'https://via.placeholder.com/300', price: 600 },
    { name: 'Item 7', image: 'https://via.placeholder.com/300', price: 700 },
    { name: 'Item 8', image: 'https://via.placeholder.com/300', price: 800 },
    { name: 'Item 9', image: 'https://via.placeholder.com/300', price: 900 },
    { name: 'Item 10', image: 'https://via.placeholder.com/300', price: 1000 }
  ];
  
  cart: any[] = [];
  displayedItems: any[] = [];
  currentIndex = 0;
  itemsPerLoad = 5;

  constructor() {}

  ngOnInit(): void {
    this.loadMoreItems();
  }

  loadMoreItems(): void {
    const nextItems = this.allItems.slice(this.currentIndex, this.currentIndex + this.itemsPerLoad);
    this.displayedItems = this.displayedItems.concat(nextItems);
    this.currentIndex += this.itemsPerLoad;
  }

  onRotateNext(): void {
    if (this.displayedItems.length === 0) {
      return;
    }
    if (this.currentIndex < this.allItems.length) {
      this.loadMoreItems();
    }
    this.displayedItems.shift(); // Remove the first item
  }

  onRotatePrevious(): void {
    // Logic for previous if needed
  }

  onPickUp(): void {
    console.log('Picked up');
  }

  onDrop(): void {
    console.log('Dropped');
  }

  onAddToCart(): void {
    this.cart.push(this.displayedItems[0]);
    console.log('Added to cart:', this.displayedItems[0]);
  }

  onThresholdExceeded(): void {
    console.log('Threshold exceeded');
  }

  onLike(): void {
    this.onRotateNext();
  }

  onDislike(): void {
    this.onRotatePrevious();
  }
}
