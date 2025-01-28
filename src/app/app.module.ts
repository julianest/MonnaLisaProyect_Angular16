import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/auth/views/login/login.component';
import { RegisterComponent } from './modules/auth/views/register/register.component';
import { HomeComponent } from './modules/general/views/home/home.component';
import { AnimatedBackgroundComponent } from './shared/components/animated-background/animated-background.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AnimatedBackgroundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
