import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
  
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
      default:
        this.router.navigateByUrl('dashboard/home');
        break;
    }
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
