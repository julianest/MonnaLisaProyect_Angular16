import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/auth/views/login/login.component';
import { RegisterComponent } from './modules/auth/views/register/register.component';
import { HomeComponent } from './modules/general/views/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './modules/general/views/dashboard/dashboard.component';
import { AnimatedBackgroundComponent } from './shared/components/animated-background/animated-background.component';
import { CircularMenuComponent } from './modules/general/views/circular-menu/circular-menu.component';
import { NumberToTextPipe } from './shared/pipes/numberToText/number-to-text.pipe';
import { TogglePasswordDirective } from './shared/directives/toggle-password/toggle-password.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    AnimatedBackgroundComponent,
    CircularMenuComponent,
    NumberToTextPipe,
    TogglePasswordDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
