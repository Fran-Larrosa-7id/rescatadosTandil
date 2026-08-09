import type { RescueCase } from '../core/models/rescue-case.model';

import { CASO_PENDIENTE_1_CASE } from './cases/caso-pendiente-1.case';
import { CASO_PENDIENTE_2_CASE } from './cases/caso-pendiente-2.case';
import { CASO_PENDIENTE_3_CASE } from './cases/caso-pendiente-3.case';
import { TIKY_CASE } from './cases/tiky.case';

export const RESCUE_CASES = [
  TIKY_CASE,
  CASO_PENDIENTE_1_CASE,
  CASO_PENDIENTE_2_CASE,
  CASO_PENDIENTE_3_CASE
] satisfies readonly RescueCase[];
