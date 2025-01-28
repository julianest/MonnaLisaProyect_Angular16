import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { LoginComponent } from './modules/auth/views/login/login.component';
import { RegisterComponent } from './modules/auth/views/register/register.component';
import { HomeComponent } from './modules/general/views/home/home.component';
import { DashboardComponent } from './modules/general/views/dashboard/dashboard.component';

const routes: Routes = [
  // { path: '', component: HomeComponent, title:'Home page' },
  // { path: 'login', component: LoginComponent, title:'Login page' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent,  title:'Register page' },
  {
    path: '', component: DashboardComponent,
    children: [
      { path: '', loadChildren: () => import('./modules/general/views/dashboard/component.module').then(components => components.ComponentModule) }
    ]
  },
  { path: '**', redirectTo:'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
