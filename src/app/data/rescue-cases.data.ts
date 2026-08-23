import type { RescueCase } from '../core/models/rescue-case.model';
import { FENIX_CASE } from './cases/fenix.case';
import { MAXINE_CASE } from './cases/maxine.case';

import { TIKY_CASE } from './cases/tiky.case';

export const RESCUE_CASES = [TIKY_CASE, MAXINE_CASE, FENIX_CASE] satisfies readonly RescueCase[];
