import { TestBed, inject } from '@angular/core/testing';

import { TorrentServiceService } from './torrent-service.service';

describe('TorrentServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TorrentServiceService]
    });
  });

  it('should be created', inject([TorrentServiceService], (service: TorrentServiceService) => {
    expect(service).toBeTruthy();
  }));
});
