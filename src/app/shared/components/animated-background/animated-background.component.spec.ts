import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimatedBackgroundComponent } from './animated-background.component';

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

  it('should update circles when numCircles changes', () => {
    component.numCircles = 8;
    component.generateCircles();
    expect(component.circles.length).toBe(8);

    component.numCircles = 3;
    component.generateCircles();
    expect(component.circles.length).toBe(3);
  });

});
