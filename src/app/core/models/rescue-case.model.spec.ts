import { CASE_STATUS_META, RescueCaseStatus } from './rescue-case.model';

describe('CASE_STATUS_META', () => {
  it('contains a label for every supported status', () => {
    const statuses: readonly RescueCaseStatus[] = [
      'needs-help',
      'treatment',
      'recovering',
      'closed',
      'memorial'
    ];

    for (const status of statuses) {
      expect(CASE_STATUS_META[status].label.length).toBeGreaterThan(0);
    }
  });
});
