import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  template: `
    <div class="container mx-auto mt-10 text-white">
      <app-header />
      <main class="pt-8">
        <router-outlet />
      </main>
    </div>
  `,
})
export class App {}
