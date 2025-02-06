import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CircularMenuComponent } from './circular-menu.component';
import { By } from '@angular/platform-browser';

describe('CircularMenuComponent', () => {
  let component: CircularMenuComponent;
  let fixture: ComponentFixture<CircularMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CircularMenuComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CircularMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe alternar el estado del menú al hacer clic en el botón', () => {
    const button = fixture.debugElement.query(By.css('.menu-button'));
    expect(component.isMenuOpen).toBeFalse();

    button.nativeElement.click();
    fixture.detectChanges();
    expect(component.isMenuOpen).toBeTrue();

    button.nativeElement.click();
    fixture.detectChanges();
    expect(component.isMenuOpen).toBeFalse();
  });

  it('debe calcular correctamente la transformación de los elementos del menú en pantallas grandes', () => {
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1024);
    component.checkScreenSize();
    fixture.detectChanges();

    const transform = component.getTransform(component.menuItems[1]); // Segundo elemento
    expect(transform).toContain('translate(');
  });

  it('debe marcar isSmallScreen como true si la pantalla es pequeña', () => {
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(500);
    component.checkScreenSize();
    expect(component.isSmallScreen).toBeTrue();
  });

  it('debe marcar isSmallScreen como false si la pantalla es grande', () => {
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1024);
    component.checkScreenSize();
    expect(component.isSmallScreen).toBeFalse();
  });

  it('debe manejar el evento de cambio de tamaño de la ventana', () => {
    spyOn(component, 'checkScreenSize');
    window.dispatchEvent(new Event('resize'));

    expect(component.checkScreenSize).toHaveBeenCalled();
  });

  it('debe devolver una transformación vacía en pantallas pequeñas', () => {
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(500);
    component.checkScreenSize();

    const transform = component.getTransform(component.menuItems[0]);
    expect(transform).toBe('');
  });

});
