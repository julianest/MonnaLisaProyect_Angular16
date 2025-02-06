import { TestBed } from '@angular/core/testing';

import { GeneralService } from './general.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GeneralService', () => {
  let service: GeneralService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(GeneralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
