import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  styleClass:string;

  @Output() visibleEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    this.styleClass = '';
  }

  doClick() {
    this.styleClass = this.styleClass == 'hamburger-menu-active' ? '' : 'hamburger-menu-active';
    this.doVisible();
  }

  doVisible(){
    this.visibleEvent.emit();
  }

}
