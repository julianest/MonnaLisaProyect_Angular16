import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamNotificationComponent } from './stream-notification.component';

describe('StreamNotificationComponent', () => {
  let component: StreamNotificationComponent;
  let fixture: ComponentFixture<StreamNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StreamNotificationComponent]
    });
    fixture = TestBed.createComponent(StreamNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
