import { Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';

@Directive({ selector: '[swipe]' })
export class SwipeDirective {
  @Output() next = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();
  @Output() addToCart = new EventEmitter<void>();
  @Output() addToPreferences = new EventEmitter<void>(); // New event emitter
  @Output() pickUp = new EventEmitter<void>();
  @Output() drop = new EventEmitter<void>();
  @Output() thresholdExceeded = new EventEmitter<void>();

  private isDragging = false;
  private initialX = 0;
  private initialY = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('touchstart', ['$event']) onSwipeStart(event: TouchEvent) {
    this.isDragging = true;
    const touch = event.touches[0];
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

    // Determine the direction based on x and y axis
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    if (absDeltaX > screenWidth * 0.2 || absDeltaY > screenHeight * 0.2) {
      if (absDeltaX > absDeltaY) {
        // Horizontal swipe
        if (deltaX > 0) {
          this.addToPreferences.emit(); // Swipe right - add to preferences
          this.next.emit(); // Swipe right - move to next item
        } else {
          this.next.emit(); // Swipe left
        }
      } else {
        // Vertical swipe
        if (deltaY < 0) {
          this.addToCart.emit(); // Swipe up - add to cart
          this.next.emit(); // Move to the next item after adding to cart
        }
      }
      actionTaken = true;
      this.thresholdExceeded.emit(); // Emit event when threshold is exceeded
    }

    if (!actionTaken) {
      this.resetPosition(); // Reset the card's position if no action is taken
    }

    this.drop.emit();

    // Log the final position of the card when dropped
    console.log(`Card dropped at position: X=${deltaX}, Y=${deltaY}`);
  }

  @HostListener('touchmove', ['$event']) onSwipeMove(event: TouchEvent) {
    if (this.isDragging) {
      const touch = event.touches[0];
      const deltaX = touch.clientX - this.initialX;
      const deltaY = touch.clientY - this.initialY;
      const screenWidth = window.innerWidth;

      // Create an arc effect while dragging
      const arcEffect = deltaX / screenWidth;
      const transform = `translate(${deltaX}px, ${deltaY - Math.abs(arcEffect * deltaY)}px)`;

      // Set the transform style to create the drag effect
      this.renderer.setStyle(this.el.nativeElement, 'transform', transform);

      // Log the current position of the card
      console.log(`Card position: X=${deltaX}, Y=${deltaY}`);
    }
  }

  private resetPosition(): void {
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.3s ease');
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translate(0, 0)');
  }
}
