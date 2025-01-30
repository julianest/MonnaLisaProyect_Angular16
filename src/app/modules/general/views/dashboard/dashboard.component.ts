import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../general.service';
import { Alertas } from 'utils/alerts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  nameUser: string = '';
  identificationnumber: string = '';

  constructor(
    private router: Router,
    private services: GeneralService,
    private alert: Alertas
  ) {}

  ngOnInit(): void {
    this.getInformationuser();
  }

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  redireccionar(opcion: number) {
    switch (opcion) {
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
        // console.log(resp);
        switch (resp.code) {
          case 200:
            localStorage.setItem('nameUser', resp.response.nombre);
            localStorage.setItem(
              'identificationNumber',
              resp.response.numeroIdetificacion
            );

            this.nameUser = String(localStorage.getItem('nameUser'));
            this.identificationnumber = String(
              localStorage.getItem('identificationNumber')
            );
            this.alert.cerrar();
            break;
          default:
            this.alert.warning('Ocurrio un problema', resp.message);
            break;
        }
      },
      error: (error: any) => {
        this.alert.warning('Ocurrio un error', error);
      },
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
