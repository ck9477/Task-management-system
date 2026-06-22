import { TestBed } from '@angular/core/testing';

import { CheckHttpService } from './check-http.service';

describe('CheckHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckHttpService = TestBed.get(CheckHttpService);
    expect(service).toBeTruthy();
  });
});
