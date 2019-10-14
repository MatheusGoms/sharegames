import { TestBed } from '@angular/core/testing';

import { MensagemService } from './mensagem.service';

describe('MensagemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MensagemService = TestBed.get(MensagemService);
    expect(service).toBeTruthy();
  });
});
