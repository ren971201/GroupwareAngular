import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  styleClass:String;

   /**
   * コンストラクタ
   * 
   * @param router Router
   */

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClick(){
    this.styleClass='form-success';
    setTimeout(()=>{
      this.router.navigate(['/']);
    },2000);
  }
}
