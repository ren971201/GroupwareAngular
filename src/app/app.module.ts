import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { SideMenuComponent } from './components/layout/side-menu/side-menu.component';
import { TopComponent } from './components/contents/top/top.component';
import { LoginComponent } from './components/contents/login/login.component';
import { RegisterComponent } from './components/contents/register/register.component';
import { VerifyComponent } from './components/contents/verify/verify.component';
import { ContentsComponent } from './components/layout/contents/contents.component';
import { useMongoDB, USE_MONGODB } from './app.config';

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
    ContentsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgbModule
  ],
  providers:[{ provide:USE_MONGODB, useValue:useMongoDB }],
  bootstrap: [AppComponent]
})
export class AppModule { }
