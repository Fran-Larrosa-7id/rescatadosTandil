import { RescueImage } from './rescue-image.model';

export type RescueCaseStatus = 'needs-help' | 'treatment' | 'recovering' | 'closed' | 'memorial';

export interface RescueNeed {
  readonly title: string;
  readonly description?: string;
}

export interface RescueCaseUpdate {
  readonly date: string;
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly image?: RescueImage;
}

export interface RescueCase {
  readonly slug: string;
  readonly name: string;
  readonly statuses: readonly RescueCaseStatus[];
  readonly featured: boolean;
  readonly summary: string;
  readonly coverImage: RescueImage;
  readonly gallery: readonly RescueImage[];
  readonly story: readonly string[];
  readonly currentNeeds: readonly RescueNeed[];
  readonly updates: readonly RescueCaseUpdate[];
  readonly updatedAt?: string | null;
  readonly seoDescription?: string;
}

export const CASE_STATUS_META = {
  'needs-help': {
    label: 'Necesita ayuda',
    tone: 'danger',
  },
  treatment: {
    label: 'En tratamiento',
    tone: 'neutral',
  },
  recovering: {
    label: 'Recuperado',
    tone: 'success',
  },
  closed: {
    label: 'Adoptado',
    tone: 'neutral',
  },
  memorial: {
    label: 'En memoria',
    tone: 'muted',
  },
} satisfies Record<
  RescueCaseStatus,
  { readonly label: string; readonly tone: 'danger' | 'neutral' | 'success' | 'muted' }
>;
