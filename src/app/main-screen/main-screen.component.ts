import { Component } from '@angular/core';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent {
  items = [
    { name: 'Item 1', price: 49.99, imageUrl: 'path/to/image1.jpg' },
    { name: 'Item 2', price: 59.99, imageUrl: 'path/to/image2.jpg' },
    // Add more items as needed
  ];

  onSwiped(direction: string, index: number) {
    if (direction === 'left') {
      this.ignoreItem(index);
    } else if (direction === 'right') {
      this.showMoreOfSameType(index);
    } else if (direction === 'up') {
      this.addToCart(index);
    }
  }

  ignoreItem(index: number) {
    console.log('Ignored:', this.items[index]);
    this.items.splice(index, 1);
  }

  showMoreOfSameType(index: number) {
    console.log('Show more of the same type:', this.items[index]);
    // Implement logic to fetch and show more items of the same type
  }

  addToCart(index: number) {
    console.log('Added to cart:', this.items[index]);
    // Implement logic to add item to cart
  }
}
