# Proyecto Angular - Gestión de Cuenta

Este proyecto es una aplicación web desarrollada con Angular 16 [Angular CLI](https://github.com/angular/angular-cli) versión 16.2.16, que permite gestionar el registro y autenticación de usuarios, así como realizar operaciones bancarias como depósitos y retiros. Se consumen APIs desde el backend para realizar todas estas acciones.

## Tecnologías Utilizadas

- **Angular 16**
- **Bootstrap 4.6**
- **jQuery 3.7.1**
- **Popper.js 1.16.1**
- **RxJS 7.8.0**
- **SweetAlert2 11.15.10**
- **Zone.js 0.13.0**
- **TypeScript 4.x**
- **Podman**

## Dockerizar la Aplicación desde GHCR

Este documento proporciona los pasos para obtener, ejecutar y administrar un contenedor Docker con una imagen almacenada en GitHub Container Registry (GHCR).

## Prerrequisitos

- Tener instalado [Podman](https://podman.io/)
- Acceso a GitHub Container Registry (GHCR)
- Haber iniciado sesión en GHCR con Docker:

  ```sh
  podman login ghcr.io -u <USERNAME> -p <PASSWORD> ghcr.io 
  ```

## Descargar y Ejecutar la Imagen

- **Descargar la imagen desde GHCR**

    ```sh
    podman pull ghcr.io/julianest/angular-app:v1.0.0 
    ```

- **Correr el contenedor**

    ```sh
    podman run --rm --name angular-app -p 4200:80 -d ghcr.io/julianest/angular-app:v1.0.0 
    ```

- **Probar la Aplicación**

    ```sh
    curl http://localhost:4200
    ```

## Generar imagen

- **Construir imagen**

    ```sh
    podman build -t <IMAGE-NAME> -f Containerfile . 
    ```

## Características

- **Login de Usuario**: Permite a los usuarios autenticarse para acceder a sus cuentas.
- **Registro de Usuario**: Nuevo usuario puede registrarse con su correo y contraseña.
- **Registro de Cuenta**: Los usuarios pueden crear una cuenta para gestionar su dinero.
- **Depósito de Dinero**: Los usuarios pueden depositar dinero en su cuenta.
- **Retiro de Dinero**: Los usuarios pueden retirar dinero de su cuenta.

## Estructura del Proyecto (MVC en Angular 16)


![image](https://github.com/user-attachments/assets/c03a6f6a-702d-4f37-9e1a-95bc1302a296)
El proyecto sigue la arquitectura MVC en Angular 16, con una organización modular enfocada en layouts y módulos.

```
src/app
│── guards/
│── models/
│   ├── request/
│   ├── response/
│── modules/
│   ├── auth/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── views/
│   ├── general/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── views/
│   ├── services/ (Servicios generales)
│── shared/
│   ├── pipes/
│   ├── directivas/
│   ├── componentes reutilizables/
│── assets/ (Imágenes y recursos)
│── utils/ (Funciones y herramientas reutilizables)
```
---
## Diagrama Figma
![MER](src\assets\img\figma.jpg)

---

## Diagrama MER
![MER](src\assets\img\MER.jpg)

---

## Diagrama de flujo
![Diagrama de flujo](src\assets\img\Diagrama_de_Flujo.jpg)

## Backends Relacionados

Este proyecto se conecta con dos backend separados:

- **Backend principal (Proyecto Bancario)**: [Repositorio en GitHub](https://github.com/CharlSK8/CuentaBancaria)
- **Microservicio Reactivo**: [Repositorio en GitHub](https://github.com/CharlSK8/CuentaBancariaReactiva)

## Instalación y Ejecución

1. Clona el repositorio:
   ```sh
   git clone https://github.com/tu-repo/proyecto-angular.git
   cd proyecto-angular
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Ejecuta la aplicación en modo desarrollo:
   ```sh
   ng serve
   ```
4. Accede a la aplicación en `http://localhost:4200/`

## Contribuciones

Si deseas contribuir, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama con tu nueva funcionalidad o mejora.
3. Realiza tus cambios y realiza un commit.
4. Abre un pull request.

Se recomienda revisar y mejorar código en distintas partes del proyecto, especialmente en:
- **Refactorización del código** para mejorar mantenibilidad y reutilización.
- **Optimización de servicios y componentes** para mejorar el rendimiento.

## Autores

- **Julian Agamez**
- **Julian Huerfano**
- **Daniel Rua**
- **Charlison Perez**

## Licencia

Este proyecto está bajo una licencia libre. Puedes usarlo y modificarlo según tus necesidades.
=======
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

