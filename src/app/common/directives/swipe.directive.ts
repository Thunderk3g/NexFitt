import { Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';

@Directive({ selector: '[swipe]' })
export class SwipeDirective {
  @Output() next = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();
  @Output() addToCart = new EventEmitter<void>();
  @Output() pickUp = new EventEmitter<void>();
  @Output() drop = new EventEmitter<void>();
  @Output() thresholdExceeded = new EventEmitter<void>();

  private swipeCoord = [0, 0];
  private swipeTime = new Date().getTime();
  private isDragging = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('touchstart', ['$event']) onSwipeStart(event: TouchEvent) {
    this.onSwipe(event, 'start');
  }

  @HostListener('touchend', ['$event']) onSwipeEnd(event: TouchEvent) {
    this.onSwipe(event, 'end');
  }

  @HostListener('touchmove', ['$event']) onSwipeMove(event: TouchEvent) {
    if (this.isDragging) {
      const touch = event.touches[0];
      const transform = `translate(${touch.clientX - this.swipeCoord[0]}px, ${touch.clientY - this.swipeCoord[1]}px)`;
      this.renderer.setStyle(this.el.nativeElement, 'transform', transform);
    }
  }

  onSwipe(event: TouchEvent, when: string) {
    const coord: [number, number] = [event.changedTouches[0].clientX, event.changedTouches[0].clientY];
    const time = new Date().getTime();

    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
      this.isDragging = true;
      this.pickUp.emit();
    } else if (when === 'end') {
      this.isDragging = false;
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      const duration = time - this.swipeTime;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      let actionTaken = false;

      if (duration < 1000) {
        if (Math.abs(direction[0]) > screenWidth * 0.25 || Math.abs(direction[1]) > screenHeight * 0.25) {
          if (Math.abs(direction[0]) > screenWidth * 0.25) {
            const swipeDir = direction[0] < 0 ? 'next' : 'previous';
            if (swipeDir === 'next') {
              this.next.emit();
            } else {
              this.previous.emit();
            }
            this.thresholdExceeded.emit(); // Emit event when threshold is exceeded
            actionTaken = true;
          } else if (direction[1] < -screenHeight * 0.25) {
            this.addToCart.emit();
            this.next.emit(); // Move to the next item after adding to cart
            this.thresholdExceeded.emit(); // Emit event when threshold is exceeded
            actionTaken = true;
          }
        }

        if (Math.abs(direction[0]) > screenWidth * 0.5 || Math.abs(direction[1]) > screenHeight * 0.5) {
          this.thresholdExceeded.emit(); // Emit event when threshold is exceeded
        }
      }

      if (!actionTaken) {
        this.renderer.setStyle(this.el.nativeElement, 'transform', 'translate(0, 0)');
      }

      this.drop.emit();
    }
  }
}
