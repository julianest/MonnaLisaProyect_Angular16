import { Component, Input  } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  @Input() isVisible: boolean = false;
  @Input() message: string = 'Cargando...';

  constructor(private spinnerService: SpinnerService) {
    this.spinnerService.isVisible$.subscribe((visible) => {
      this.isVisible = visible;
    });
  }
}

/* Forma de usarlo:
Se debe importar el servicio del spinner en el archivo ts del componente que se desea agregar:
  * import { SpinnerService } from'src/app/services/spinner.service';
Luego se debe inyectar al constructor del componente:
  * private spinnerService: SpinnerService,
Por ultimo llamarlo donde se requiere y cerrarlo de la misma forma asi:
  *    this.spinnerService.show();
  *    this.spinnerService.hide(3000); // Si se quiere enviar un tiempo de retraso se envia por parametro ej: 3 Segundos = 3000
Ejemplo de uso ver componente: LoginComponent.ts
*/
