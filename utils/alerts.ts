import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class Alertas {
  loading() {
    Swal.fire({
      title: 'Espere por favor...',
      text: 'Cargando información',
      allowOutsideClick: false,
      showConfirmButton: false,
    });
    Swal.showLoading();
  }

  loading_text(servicio: string) {
    Swal.fire({
      title: 'Espere...',
      text: 'Cargando ' + servicio,
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
    Swal.showLoading();
  }

  success(titulo: string, texto: string) {
    Swal.fire({
      title: titulo,
      text: texto,
      icon: 'success',
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#1b5387',
    });
  }

  warning(titulo: string, texto: string) {
    Swal.fire({
      title: titulo,
      text: texto,
      icon: 'warning',
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#1b5387',
    });
  }

  error(titulo: string, texto: string) {
    Swal.fire({
      title: titulo,
      text: texto,
      icon: 'error',
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#1b5387',
    });
  }

  cerrar() {
    Swal.close();
  }

  async toast(texto: string): Promise<void> {
    Swal.fire({
      position: 'center',
      title: texto,
      showConfirmButton: false,
      timer: 4500,
    });
  }
}
