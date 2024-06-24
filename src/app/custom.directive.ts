import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[custom-directive]',
})
export class CustomDirective {
  constructor(private ele: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.ele.nativeElement.style.color = 'white';
    this.ele.nativeElement.style.backgroundColor = '#df164b';
  }

  @HostListener('mouseout') onMouseOut() {
    this.ele.nativeElement.style.color = 'black';
    this.ele.nativeElement.style.backgroundColor = 'rgb(206, 203, 203)';
  }
}
