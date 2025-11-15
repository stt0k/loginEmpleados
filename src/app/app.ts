import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  template: `
    <div class="min-h-screen">
      <app-header />
      <main class="pt-4">
        <router-outlet />
      </main>
    </div>
  `,
})
export class App {}
