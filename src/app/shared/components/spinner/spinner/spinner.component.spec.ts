import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerComponent } from './spinner.component';
import { SpinnerService } from 'src/app/services/spinner.service';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;
  let spinnerServiceMock: jasmine.SpyObj<SpinnerService>;
  let isVisibleSubject: BehaviorSubject<boolean>;

  beforeEach(() => {
    isVisibleSubject = new BehaviorSubject<boolean>(false);
    spinnerServiceMock = jasmine.createSpyObj('SpinnerService', [], {
      isVisible$: isVisibleSubject.asObservable(),
    });

    TestBed.configureTestingModule({
      declarations: [SpinnerComponent],
      providers: [{ provide: SpinnerService, useValue: spinnerServiceMock }],
    });

    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should be hidden by default', () => {
    const loadingIndicator = fixture.debugElement.query(By.css('#loading-indicator'));
    expect(loadingIndicator.nativeElement.style.display).toBe('none');
  });

  it('should show spinner when isVisible is true', () => {
    component.isVisible = true;
    fixture.detectChanges();

    const loadingIndicator = fixture.debugElement.query(By.css('#loading-indicator'));
    expect(loadingIndicator.nativeElement.style.display).toBe('flex');
  });

  it('should update visibility when SpinnerService emits a value', () => {
    isVisibleSubject.next(true);
    fixture.detectChanges();

    expect(component.isVisible).toBeTrue();

    isVisibleSubject.next(false);
    fixture.detectChanges();

    expect(component.isVisible).toBeFalse();
  });

  it('should display the default message', () => {
    const messageElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(messageElement.textContent).toBe('Cargando...');
  });

  it('should display a custom message when set', () => {
    component.message = 'Procesando...';
    fixture.detectChanges();

    const messageElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(messageElement.textContent).toBe('Procesando...');
  });
});