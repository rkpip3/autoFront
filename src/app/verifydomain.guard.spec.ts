import { TestBed, async, inject } from '@angular/core/testing';

import { VerifydomainGuard } from './verifydomain.guard';

describe('VerifydomainGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerifydomainGuard]
    });
  });

  it('should ...', inject([VerifydomainGuard], (guard: VerifydomainGuard) => {
    expect(guard).toBeTruthy();
  }));
});
