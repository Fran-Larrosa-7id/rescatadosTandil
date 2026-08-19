import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import flatpickr from 'flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import type { Instance } from 'flatpickr/dist/types/instance';
@Directive({ selector: 'input[appAdminDatePicker]', standalone: true })
export class AdminDatePickerDirective implements AfterViewInit, OnChanges, OnDestroy {
  @Input() dateValue = '';
  @Output() dateValueChange = new EventEmitter<string>();
  private picker?: Instance;

  constructor(private readonly element: ElementRef<HTMLInputElement>) {}

  ngAfterViewInit(): void {
    this.picker = flatpickr(this.element.nativeElement, {
      locale: Spanish,
      dateFormat: 'Y-m-d',
      altInput: true,
      altFormat: 'd/m/Y',
      allowInput: false,
      disableMobile: true,
      defaultDate: this.dateValue || undefined,
      onChange: (dates) =>
        this.dateValueChange.emit(dates[0] ? this.picker!.formatDate(dates[0], 'Y-m-d') : ''),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.picker || !changes['dateValue']) return;
    if (this.dateValue) this.picker.setDate(this.dateValue, false, 'Y-m-d');
    else this.picker.clear(false);
  }

  ngOnDestroy(): void {
    this.picker?.destroy();
  }
}
