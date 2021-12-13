import { TestBed } from '@angular/core/testing';

import { UpdatefirebaseService } from './updatefirebase.service';

describe('UpdatefirebaseService', () => {
  let service: UpdatefirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdatefirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
