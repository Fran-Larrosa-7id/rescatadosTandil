import { TestBed } from '@angular/core/testing';

import { RESCUE_CASES } from '../../data/rescue-cases.data';
import { RescueCasesService } from './rescue-cases.service';

describe('RescueCasesService', () => {
  let service: RescueCasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RescueCasesService);
  });

  it('returns a case by slug', () => {
    const firstCase = RESCUE_CASES[0];

    expect(service.getBySlug(firstCase.slug)).toBe(firstCase);
  });

  it('returns undefined for an unknown slug', () => {
    expect(service.getBySlug('no-existe')).toBeUndefined();
  });

  it('filters featured cases', () => {
    expect(service.getFeatured().every((item) => item.featured)).toBe(true);
  });

  it('exposes Tiky through the detail, featured, recovering and adopted collections', () => {
    const tiky = service.getBySlug('tiky');

    expect(tiky?.featured).toBe(true);
    expect(tiky?.statuses).toEqual(['recovering', 'closed']);
    expect(service.getFeatured()).toContain(tiky);
    expect(service.getByStatus('recovering')).toContain(tiky);
    expect(service.getByStatus('closed')).toContain(tiky);
  });

  it('keeps slugs unique', () => {
    const slugs = RESCUE_CASES.map((item) => item.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
