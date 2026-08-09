import type { RescueCase } from '../../core/models/rescue-case.model';

export const CASO_PENDIENTE_3_CASE = {
  slug: 'caso-pendiente-3',
  name: '[Nombre del animal]',
  status: 'treatment',
  featured: true,
  summary: '[Resumen breve proporcionado por la rescatista]',
  coverImage: {
    src: '/images/placeholders/case-placeholder.svg',
    alt: 'Foto pendiente del caso'
  },
  gallery: [],
  story: ['[Historia proporcionada por la rescatista]'],
  currentNeeds: [],
  updates: [],
  updatedAt: null
} satisfies RescueCase;
