import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appMystyle]'
})
export class MystyleDirective {
  private el:ElementRef;
  @Input() c:string = 'white';
  @Input() bg:string = '1E90FF';

  constructor(el: ElementRef) {
    this.el = el;
  }

  ngOnInit() {
    this.el.nativeElement.style.color = this.c;
    this.el.nativeElement.style.backgroundColor = this.bg;
  }

}
