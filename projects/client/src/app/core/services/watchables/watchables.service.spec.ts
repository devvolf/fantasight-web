import { TestBed } from '@angular/core/testing';

import { WatchablesService } from './watchables.service';

describe('WatchablesService', () => {
  let service: WatchablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WatchablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
