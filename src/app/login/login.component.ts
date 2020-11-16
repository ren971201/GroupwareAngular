import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor(private router: Router, private fb: FormBuilder) {
    this.loginForm= this.fb.group({
      username:new FormControl('', [Validators.required]),
      password:new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

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
