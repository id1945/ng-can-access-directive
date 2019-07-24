import { TestBed } from '@angular/core/testing';

import { AuthorizedService } from './authorized.service';

describe('AuthorizedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorizedService = TestBed.get(AuthorizedService);
    expect(service).toBeTruthy();
  });
});
