import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  styleClass:String;
  message:string = "Welcome";
  loginForm:FormGroup;

   /**
   * コンストラクタ
   * 
   * @param router Router
   */

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm= new FormGroup({
      username:new FormControl('', [Validators.required]),
      password:new FormControl('', [Validators.required])
    });
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }   

  onSubmit(){
    if(this.loginForm.invalid){
      this.message = '入力は必須です。'
    }
    else{
      this.message='Hello!'+this.loginForm.value.username+'!';
      this.styleClass='form-success';
      setTimeout(()=>{
        this.router.navigate(['/']);
      },2000);  
    }
  }
}
