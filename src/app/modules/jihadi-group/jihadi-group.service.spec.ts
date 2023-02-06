import { TestBed } from '@angular/core/testing';

import { JihadiGroupService } from './jihadi-group.service';

describe('JihadiGroupService', () => {
  let service: JihadiGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JihadiGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
