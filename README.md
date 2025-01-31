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