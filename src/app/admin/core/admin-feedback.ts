import { Injectable, signal } from '@angular/core';

export type AdminFeedbackKind = 'success' | 'error' | 'info' | 'warning';
export interface AdminFeedback { kind: AdminFeedbackKind; message: string; }

/** A small in-page status primitive; it intentionally does not persist or toast. */
@Injectable({ providedIn: 'root' })
export class AdminFeedbackService {
  readonly current = signal<AdminFeedback | null>(null);
  show(kind: AdminFeedbackKind, message: string): void { this.current.set({ kind, message }); }
  clear(): void { this.current.set(null); }
}
