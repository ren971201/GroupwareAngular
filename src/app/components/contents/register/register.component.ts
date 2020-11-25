import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
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
      this.router.navigate(['/verify']);
    },2000);
  }
}
