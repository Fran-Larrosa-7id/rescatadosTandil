import { Injectable } from '@angular/core';

import { RESCUE_CASES } from '../../data/rescue-cases.data';
import { RescueCase, RescueCaseStatus } from '../models/rescue-case.model';

@Injectable({
  providedIn: 'root'
})
export class RescueCasesService {
  readonly cases = RESCUE_CASES;

  getBySlug(slug: string): RescueCase | undefined {
    return this.cases.find((item) => item.slug === slug);
  }

  getFeatured(): readonly RescueCase[] {
    return this.cases.filter((item) => item.featured);
  }

  getByStatus(status: RescueCaseStatus | 'all'): readonly RescueCase[] {
    if (status === 'all') {
      return this.cases;
    }

    return this.cases.filter((item) => item.status === status);
  }
}
