import type { RescueCase } from '../core/models/rescue-case.model';
import { FENIX_CASE } from './cases/fenix.case';
import { GINA_CASE } from './cases/gina.case';
import { MATILDA_CASE } from './cases/matilda.case';
import { MAXINE_CASE } from './cases/maxine.case';
import { PATAN_CASE } from './cases/patan.case';
import { POCHOCLO_CASE } from './cases/pochoclo.case';
import { RAFA_CASE } from './cases/rafa.case';

import { TIKY_CASE } from './cases/tiky.case';

export const RESCUE_CASES = [
  TIKY_CASE,
  MAXINE_CASE,
  FENIX_CASE,
  POCHOCLO_CASE,
  PATAN_CASE,
  GINA_CASE,
  RAFA_CASE,
  MATILDA_CASE,
] satisfies readonly RescueCase[];
