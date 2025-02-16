import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../general.service';
import { Alertas } from 'utils/alerts';
import { AuthService } from '../../../auth/views/auth.service';
import { ServiceResponse } from 'src/app/models/response/auth-response.model';
import { AuthLogoutRequest } from 'src/app/models/request/auth-request.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  nameUser: string = '';
  identificationnumber: string = '';

  constructor(
    private readonly router: Router,
    private readonly services: GeneralService,
    private readonly alert: Alertas,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getInformationuser();
  }

  logOut() {
    const token = localStorage.getItem('access_token');

    if (!token) {
        this.alert.error("No hay sesión activa", "No se encontró un token válido");
        return;
    }

    const credentials: AuthLogoutRequest = { token };

    this.authService.logout(credentials).subscribe({
      next: (resp: ServiceResponse) => {
          if (resp.code === 200) {
              this.alert.success("Sesión Cerrada", resp.message);

              localStorage.clear();
              setTimeout(() => {
                  this.router.navigateByUrl('/login');
              }, 1000);
          } else {
              this.alert.error("No se pudo cerrar sesión", "Verificar Token");
          }
      },
      error: () => {
          this.alert.error("Error desconocido", "Por favor intentelo más tarde");
      }
          });
  }

  redireccionar(opcion: number) {
    switch (opcion) {
      case 0:
        this.router.navigateByUrl('dashboard/home');
        break;
      case 1:
        this.router.navigateByUrl('dashboard/depositar');
        break;
      case 2:
        this.router.navigateByUrl('dashboard/retirar');
        break;
      case 3:
        this.router.navigateByUrl('dashboard/registrar');
        break;
      default:
        this.router.navigateByUrl('dashboard/home');
        break;
    }
  }

  getInformationuser() {
    this.alert.loading();

    const url = String(localStorage.getItem('id_user'));

    this.services.getInfoUser(url).subscribe({
      next: (resp: any) => {
        if (resp.code === 200) {
          localStorage.setItem('nameUser', resp.response.nombre);
          localStorage.setItem('identificationNumber', resp.response.numeroIdentificacion);

          this.nameUser = String(localStorage.getItem('nameUser'));
          this.identificationnumber = String(localStorage.getItem('identificationNumber'));
          this.alert.cerrar();
        } else {
          this.alert.warning('Ocurrió un problema', resp.message);
        }
      },
      error: (error: any) => {
        this.alert.warning('Ocurrió un error', error);
      }
    });
  }

  toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    if (sidebar && overlay) {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('active');
    }
  }

  closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    if (sidebar && overlay) {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    }
  }
}
