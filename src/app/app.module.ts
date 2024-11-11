import { NgModule } from '@angular/core';

import { AuthService } from './auth/services/auth.service';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
//import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  declarations: [],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    HttpClientModule
    
    

    
  ],
  providers: [AuthService],
 
})
export class AppModule { }
