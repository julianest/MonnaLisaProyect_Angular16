import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositComponent } from './deposit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DepositComponent', () => {
  let component: DepositComponent;
  let fixture: ComponentFixture<DepositComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepositComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(DepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
