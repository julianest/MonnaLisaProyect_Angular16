import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimatedBackgroundComponent } from './animated-background.component';
import { By } from '@angular/platform-browser';

describe('AnimatedBackgroundComponent', () => {
  let component: AnimatedBackgroundComponent;
  let fixture: ComponentFixture<AnimatedBackgroundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimatedBackgroundComponent]
    });

    fixture = TestBed.createComponent(AnimatedBackgroundComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize circles on ngOnInit', () => {
    spyOn(component, 'generateCircles').and.callThrough();
    fixture.detectChanges(); // Dispara ngOnInit()

    expect(component.generateCircles).toHaveBeenCalled();
    expect(component.circles.length).toBe(component.numCircles);
  });

  it('should generate circles with correct properties', () => {
    component.numCircles = 5;
    component.generateCircles();

    expect(component.circles.length).toBe(5);
    component.circles.forEach(circle => {
      expect(circle.top).toMatch(/\d+(\.\d+)?%/); // Debe ser un porcentaje
      expect(circle.left).toMatch(/\d+(\.\d+)?%/);
      expect(circle.size).toMatch(/\d+px/);
      expect(circle.animationDelay).toMatch(/\d+(\.\d+)?s/);
    });
  });

  it('should update circles when numCircles changes', () => {
    component.numCircles = 8;
    component.generateCircles();
    expect(component.circles.length).toBe(8);

    component.numCircles = 3;
    component.generateCircles();
    expect(component.circles.length).toBe(3);
  });

  it('should apply correct styles to circles', () => {
    component.circleColor = '#ff0000'; // Rojo
    component.numCircles = 3;
    component.generateCircles();
    fixture.detectChanges();

    const circleElements = fixture.debugElement.queryAll(By.css('.circle'));
    expect(circleElements.length).toBe(3);

    circleElements.forEach((el, index) => {
      expect(el.nativeElement.style.background).toBe(component.circleColor);
      expect(el.nativeElement.style.top).toBe(component.circles[index].top);
      expect(el.nativeElement.style.left).toBe(component.circles[index].left);
      expect(el.nativeElement.style.width).toBe(component.circles[index].size);
      expect(el.nativeElement.style.height).toBe(component.circles[index].size);
      expect(el.nativeElement.style.animationDelay).toBe(component.circles[index].animationDelay);
    });
  });
});