import type { RescueCase } from '../core/models/rescue-case.model';

import { TIKY_CASE } from './cases/tiky.case';

export const RESCUE_CASES = [TIKY_CASE] satisfies readonly RescueCase[];
