import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToText'
})
export class NumberToTextPipe implements PipeTransform {

  transform(value: number | string): string {
    // Convertir el valor a número si es una cadena
    if (typeof value === 'string') {
      value = parseFloat(value.replace(/[^0-9.-]+/g, '')); // Quitar caracteres no numéricos
    }
    if (isNaN(value)) {
      return 'Valor no válido';
    }

    return this.convertToText(value);
  }

  private convertToText(value: number): string {
    const UNIDADES = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    const DECENAS = [
      '', 'diez', 'veinte', 'treinta', 'cuarenta', 'cincuenta',
      'sesenta', 'setenta', 'ochenta', 'noventa'
    ];
    const CENTENAS = [
      '', 'cien', 'doscientos', 'trescientos', 'cuatrocientos',
      'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'
    ];
    const MILLONES = 'millón';
    const MILLONES_PLURAL = 'millones';

    const pesos = Math.floor(value); // Parte entera del número
    const centavos = Math.round((value - pesos) * 100); // Parte decimal convertida a centavos

    const partes: string[] = [];
    const parseNumber = (num: number): string => {
      if (num === 0) return '';
      const centenas = Math.floor(num / 100);
      const decenas = Math.floor((num % 100) / 10);
      const unidades = num % 10;

      let texto = '';
      if (centenas > 0) {
        texto += CENTENAS[centenas] + ' ';
      }
      if (decenas > 0 || unidades > 0) {
        if (decenas === 1 && unidades > 0) {
          // Manejar casos como "dieciséis"
          texto += this.getTeens(unidades);
        } else {
          texto += DECENAS[decenas] + (unidades > 0 ? ' y ' + UNIDADES[unidades] : '');
        }
      } else {
        texto += UNIDADES[unidades];
      }
      return texto.trim();
    };

const handleMillions = (num: number): void => {
  const millones = Math.floor(num / 1_000_000);
  const resto = num % 1_000_000;

  if (millones > 0) {
    const millonesTexto = millones === 1 ? MILLONES : parseNumber(millones) + " " + MILLONES_PLURAL;
    partes.push(millonesTexto);
  }

  if (resto > 0) {
    handleThousands(resto);
  }
};


    const handleThousands = (num: number): void => {
      const miles = Math.floor(num / 1_000);
      const resto = num % 1_000;
      if (miles > 0) {
        partes.push(`${miles === 1 ? 'mil' : parseNumber(miles) + ' mil'}`);
      }
      if (resto > 0) {
        partes.push(parseNumber(resto));
      }
    };

    if (pesos >= 1_000_000) {
      handleMillions(pesos);
    } else if (pesos >= 1_000) {
      handleThousands(pesos);
    } else {
      partes.push(parseNumber(pesos));
    }

    const pesosTexto = partes.join(', ');
    const centavosTexto = centavos > 0 ? ` con ${centavos}/100` : '';
    return `${pesosTexto} pesos${centavosTexto}`;
  }

  private getTeens(unidades: number): string {
    const TEENS = [
      'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis',
      'diecisiete', 'dieciocho', 'diecinueve'
    ];
    return TEENS[unidades - 1];
  }
}

// Forma de usar: solo se debe ingresar el numero y el pipe en el html
// <p>{{ 201234567 | numberToText }}</p>
