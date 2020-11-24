import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  visibleSidemenu: boolean;
  style:String="";

  constructor() { }

  ngOnInit(): void {
    this.visibleSidemenu = false;
    this.style = "";
  }

  doVisible(){
    this.visibleSidemenu = !this.visibleSidemenu;
    if(this.style==""){
      this.style = "move";
    }
    else{
      this.style = "";
    }
  }
}
