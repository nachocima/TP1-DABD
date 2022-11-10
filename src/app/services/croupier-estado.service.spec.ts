import { TestBed } from '@angular/core/testing';

import { CroupierEstadoService } from './croupier-estado.service';

describe('CroupierEstadoService', () => {
  let service: CroupierEstadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CroupierEstadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
