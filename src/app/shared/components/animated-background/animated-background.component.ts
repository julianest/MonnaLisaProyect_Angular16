import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-animated-background',
  templateUrl: './animated-background.component.html',
  styleUrls: ['./animated-background.component.css']
})
export class AnimatedBackgroundComponent implements OnInit {
  @Input() circleColor: string = '#1db954'; // Color predeterminado
  @Input() numCircles: number = 6; // Número de círculos
  circles: { top: string; left: string; size: string; animationDelay: string }[] = [];

  ngOnInit(): void {
    this.generateCircles();
  }

  generateCircles(): void {
    this.circles = Array.from({ length: this.numCircles }, () => ({
      top: `${Math.random() * 100}%`, // Posición vertical aleatoria
      left: `${Math.random() * 100}%`, // Posición horizontal aleatoria
      size: `${Math.random() * 50 + 20}px`, // Tamaño aleatorio entre 20px y 70px
      animationDelay: `${Math.random() * 2}s` // Retardo de animación aleatorio
    }));
  }
}
