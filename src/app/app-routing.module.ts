import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './modules/auth/views/login/login.component';
import { RegisterComponent } from './modules/auth/views/register/register.component';
import { DashboardComponent } from './modules/general/views/dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, title:'Login page' },
  { path: 'register', component: RegisterComponent,  title:'Register page' },
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      { path: '', loadChildren: () => import('./modules/general/views/dashboard/component.module').then(components => components.ComponentModule) }
    ]
  },
  { path: '**', redirectTo:'/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
