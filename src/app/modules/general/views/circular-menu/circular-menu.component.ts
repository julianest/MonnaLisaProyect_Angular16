import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-circular-menu',
  templateUrl: './circular-menu.component.html',
  styleUrls: ['./circular-menu.component.css']
})
export class CircularMenuComponent {
  isMenuOpen = true;
  isSmallScreen = false;
  menuItems = [
    { name: 'Contacto', icon: 'fas fa-envelope' },
    { name: 'Servicios', icon: 'fas fa-cogs' },
    { name: 'Conócenos', icon: 'fas fa-info-circle' },
    { name: 'Blog', icon: 'fas fa-blog' }
  ];

  ngOnInit() {
    this.checkScreenSize();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }


  checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 768;
  }

  getTransform(item: any): string {
    if (this.isSmallScreen) {
      // Si estamos en dispositivos pequeños, no usar transformaciones
      return '';
    }
    const index = this.menuItems.indexOf(item);
    const angle = (180 / (this.menuItems.length - 1)) * index; // Dividir los ítems en un arco de 180 grados
    const radius = 80; // Radio del semicírculo
    const y = radius * Math.cos((angle * Math.PI) / 180);
    const x = radius * Math.sin((angle * Math.PI) / 180);
    return `translate(${x}px, ${-y}px)`; // Invertimos las coordenadas para adaptarlas a la verticalidad
  }
}
