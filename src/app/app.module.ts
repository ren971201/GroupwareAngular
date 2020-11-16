import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { TopComponent } from './top/top.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerifyComponent } from './verify/verify.component';
import { HttpClientModule } from '@angular/common/http';
import { MystyleDirective } from './mystyle.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from './shared/product.service'

const routes:Routes = [
  { path: '', component: TopComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'verify', component: VerifyComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    SideMenuComponent,
    TopComponent,
    LoginComponent,
    RegisterComponent,
    VerifyComponent,
    MystyleDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgbModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
