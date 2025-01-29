import { Routes } from "@angular/router";
import { HomeComponent } from "../home/home.component";
import { DepositComponent } from "../deposit/deposit.component";
import { WithdrawComponent } from "../withdraw/withdraw.component";
import { RegisterAccountComponent } from "../register-account/register-account/register-account.component";

export const ComponentRoutes: Routes = [
    { path: 'dashboard/home', component: HomeComponent },
    { path: 'dashboard/depositar', component: DepositComponent },
    { path: 'dashboard/retirar', component: WithdrawComponent },
    { path: 'dashboard/registrar', component: RegisterAccountComponent }
];
