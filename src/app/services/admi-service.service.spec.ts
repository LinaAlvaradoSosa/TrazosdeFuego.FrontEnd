import { TestBed } from '@angular/core/testing';

import { AdmiServiceService } from './admi-service.service';

describe('AdmiServiceService', () => {
  let service: AdmiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdmiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
