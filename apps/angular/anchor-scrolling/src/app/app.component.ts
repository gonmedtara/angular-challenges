import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `,
  styles: [
    `
      html {
        scroll-behavior: smooth;
      }
    `,
  ],
})
export class AppComponent {}
