# Proyecto Angular - Gestión de Cuenta

Este proyecto es una aplicación web desarrollada con Angular 16 [Angular CLI](https://github.com/angular/angular-cli) version 16.2.16, que permite gestionar el registro y autenticación de usuarios, así como realizar operaciones bancarias como depósitos y retiros. Se consumen APIs desde el backend para realizar todas estas acciones.

## Características

- **Login de Usuario**: Permite a los usuarios autenticarse para acceder a sus cuentas.
- **Registro de Usuario**: Nuevo usuario puede registrarse con su correo y contraseña.
- **Registro de Cuenta**: Los usuarios pueden crear una cuenta para gestionar su dinero.
- **Depósito de Dinero**: Los usuarios pueden depositar dinero en su cuenta.
- **Retiro de Dinero**: Los usuarios pueden retirar dinero de su cuenta.

## Tecnologías utilizadas

- **Frontend**: Angular 16
  - **HTML**: Estructura y contenido de las páginas.
  - **CSS**: Estilos y diseño de la interfaz.
  - **TypeScript**: Lógica y control de la aplicación.
- **Backend**: API RESTful (especificada en otro repositorio o servicio)
- **Servicios HTTP**: Angular HttpClient para consumir las APIs desde el backend.

## Servidor de desarrollo

Ejecuta `ng serve` para iniciar el servidor de desarrollo. Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si realizas cambios en alguno de los archivos fuente.

## Generación de código

Ejecuta `ng generate component nombre-del-componente` para generar un nuevo componente. También puedes usar `ng generate directive|pipe|service|class|guard|interface|enum|module` para generar otros tipos de archivos.

## Compilación

Ejecuta `ng build` para compilar el proyecto. Los archivos generados se almacenarán en el directorio `dist/`.

## Ejecución de pruebas unitarias

Ejecuta `ng test` para ejecutar las pruebas unitarias a través de [Karma](https://karma-runner.github.io).

## Ejecución de pruebas de extremo a extremo

Ejecuta `ng e2e` para ejecutar las pruebas de extremo a extremo utilizando la plataforma que prefieras. Para usar este comando, primero debes agregar un paquete que implemente capacidades de pruebas de extremo a extremo.

## Estructura del Proyecto

![image](https://github.com/user-attachments/assets/c03a6f6a-702d-4f37-9e1a-95bc1302a296)


## Ayuda adicional

Para obtener más ayuda sobre el uso de Angular CLI, ejecuta `ng help` o consulta la página de [Resumen de Angular CLI y Referencia de Comandos](https://angular.io/cli).


