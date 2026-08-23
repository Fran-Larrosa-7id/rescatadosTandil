import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-paw-trail',
  imports: [IconComponent],
  template: `
    <div class="paw-trail" aria-hidden="true">
      <app-icon name="paw" class="paw-trail__print paw-trail__print--one" />
      <app-icon name="paw" class="paw-trail__print paw-trail__print--two" />
      <app-icon name="paw" class="paw-trail__print paw-trail__print--three" />
      <app-icon name="paw" class="paw-trail__print paw-trail__print--four" />
      <app-icon name="paw" class="paw-trail__print paw-trail__print--five" />
      <app-icon name="paw" class="paw-trail__print paw-trail__print--six" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PawTrailComponent {}
