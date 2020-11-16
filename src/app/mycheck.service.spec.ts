import { TestBed } from '@angular/core/testing';

import { MycheckService } from './mycheck.service';

describe('MycheckService', () => {
  let service: MycheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MycheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
