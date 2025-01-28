import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularMenuComponent } from './circular-menu.component';

describe('CircularMenuComponent', () => {
  let component: CircularMenuComponent;
  let fixture: ComponentFixture<CircularMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CircularMenuComponent]
    });
    fixture = TestBed.createComponent(CircularMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
