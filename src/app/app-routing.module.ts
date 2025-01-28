import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { LoginComponent } from './modules/auth/views/login/login.component';
import { RegisterComponent } from './modules/auth/views/register/register.component';
import { HomeComponent } from './modules/general/views/home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, title:'Login page' },
  { path: 'register', component: RegisterComponent,  title:'Register page' },
  { path: '**', redirectTo:'/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
