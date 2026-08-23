import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { PawTrailComponent } from './shared/components/paw-trail/paw-trail.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PawTrailComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly router = inject(Router);

  protected showPawTrail(): boolean {
    return !this.router.url.startsWith('/admin');
  }
}
