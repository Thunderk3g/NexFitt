import { Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';

@Directive({ selector: '[swipe]' })
export class SwipeDirective {
  @Output() next = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();
  @Output() addToCart = new EventEmitter<void>();
  @Output() pickUp = new EventEmitter<void>();
  @Output() drop = new EventEmitter<void>();
  @Output() thresholdExceeded = new EventEmitter<void>();

  private isDragging = false;
  private initialX = 0;
  private initialY = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('touchstart', ['$event']) onSwipeStart(event: TouchEvent) {
    this.isDragging = true;
    const touch = event.touches[0];  // Corrected the typo here
    this.initialX = touch.clientX;
    this.initialY = touch.clientY;
    this.pickUp.emit();
  }

  @HostListener('touchend', ['$event']) onSwipeEnd(event: TouchEvent) {
    this.isDragging = false;
    const touch = event.changedTouches[0];
    const finalX = touch.clientX;
    const finalY = touch.clientY;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const deltaX = finalX - this.initialX;
    const deltaY = finalY - this.initialY;

    let actionTaken = false;

    // Separate checks for each direction
    if (this.isSwipeLeft(deltaX, screenWidth)) {
      this.next.emit();
      actionTaken = true;
    } else if (this.isSwipeRight(deltaX, screenWidth)) {
      this.previous.emit();
      actionTaken = true;
    } else if (this.isSwipeUp(deltaY, screenHeight)) {
      this.addToCart.emit();
      this.next.emit(); // Move to the next item after adding to cart
      actionTaken = true;
    }

    if (!actionTaken) {
      this.renderer.setStyle(this.el.nativeElement, 'transform', 'translate(0, 0)');
    }

    this.drop.emit();
  }

  @HostListener('touchmove', ['$event']) onSwipeMove(event: TouchEvent) {
    if (this.isDragging) {
      const touch = event.touches[0];
      const transform = `translate(${touch.clientX - this.initialX}px, ${touch.clientY - this.initialY}px)`;
      this.renderer.setStyle(this.el.nativeElement, 'transform', transform);
    }
  }

  private isSwipeLeft(deltaX: number, screenWidth: number): boolean {
    return deltaX < -screenWidth * 0.2;
  }

  private isSwipeRight(deltaX: number, screenWidth: number): boolean {
    return deltaX > screenWidth * 0.2;
  }

  private isSwipeUp(deltaY: number, screenHeight: number): boolean {
    return deltaY < -screenHeight * 0.2;
  }
}
