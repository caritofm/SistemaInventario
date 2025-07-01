import { TestBed } from '@angular/core/testing';

import { ServicesBDService } from './services-bd.service';

describe('ServicesBDService', () => {
  let service: ServicesBDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesBDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
