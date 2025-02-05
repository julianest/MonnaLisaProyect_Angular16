import { Directive, HostListener, Input, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTogglePassword]'
})
export class TogglePasswordDirective {
  @Input() targetInput!: HTMLInputElement;
  private isPasswordVisible: boolean = false;

  constructor(private readonly el: ElementRef, private readonly renderer: Renderer2) {}

  @HostListener('click') onClick(): void {
    this.isPasswordVisible = !this.isPasswordVisible;

    // Cambiamos el tipo del input
    const inputType = this.isPasswordVisible ? 'text' : 'password';
    this.renderer.setProperty(this.targetInput, 'type', inputType);

    // Actualizamos el contenido del botón o ícono
    const icon = this.isPasswordVisible ? '🙈' : '👁️';
    this.renderer.setProperty(this.el.nativeElement, 'textContent', icon);
  }
}
