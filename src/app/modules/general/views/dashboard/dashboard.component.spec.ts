import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from './dashboard.component';
import { GeneralService } from '../general.service';
import { Alertas } from 'utils/alerts';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Componente Dashboard', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let generalServiceSpy: jasmine.SpyObj<GeneralService>;
  let alertasSpy: jasmine.SpyObj<Alertas>;

  beforeEach(() => {
    generalServiceSpy = jasmine.createSpyObj('GeneralService', ['getInfoUser']);
    alertasSpy = jasmine.createSpyObj('Alertas', ['loading', 'cerrar', 'warning']);

    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: GeneralService, useValue: generalServiceSpy },
        { provide: Alertas, useValue: alertasSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  describe('Métodos del componente', () => {
    beforeEach(() => {
      // Simulamos un usuario almacenado en localStorage
      spyOn(localStorage, 'getItem').and.callFake((key: string) => {
        if (key === 'id_user') return '123'; // Simulamos un ID de usuario
        return null;
      });

    });

    /*it('debería realizar el logout correctamente', () => {
      spyOn(localStorage, 'clear');
      spyOn(component['router'], 'navigateByUrl');

      component.logOut();

      expect(localStorage.clear).toHaveBeenCalled();
      expect(component['router'].navigateByUrl).toHaveBeenCalledWith('/login');
    });*/

    it('debería redireccionar a la ruta correcta según la opción', () => {
      const navigateByUrlSpy = spyOn(component['router'], 'navigateByUrl');

      component.redireccionar(0);
      expect(navigateByUrlSpy).toHaveBeenCalledWith('dashboard/home');

      component.redireccionar(1);
      expect(navigateByUrlSpy).toHaveBeenCalledWith('dashboard/depositar');

      component.redireccionar(2);
      expect(navigateByUrlSpy).toHaveBeenCalledWith('dashboard/retirar');

      component.redireccionar(3);
      expect(navigateByUrlSpy).toHaveBeenCalledWith('dashboard/registrar');
    });

    it('debería cerrar el sidebar correctamente', () => {
      const sidebar = document.createElement('div');
      const overlay = document.createElement('div');
      document.body.appendChild(sidebar);
      document.body.appendChild(overlay);

      component.closeSidebar();
      expect(sidebar.classList.contains('open')).toBeFalse();
      expect(overlay.classList.contains('active')).toBeFalse();
    });
  });
});
