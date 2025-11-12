import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Service } from '../../services/service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  template: `
    <div>
      <ul class="flex space-x-3 justify-end m-5 items-center">
        <li>
          <a [routerLink]="'/home'" class="hover:text-white/60 transition">Inicio</a>
        </li>

        <li *ngIf="isAuthenticated">
          <a [routerLink]="'/perfil'" class="hover:text-white/60 transition">Perfil</a>
        </li>

        <li *ngIf="isAuthenticated">
          <a [routerLink]="'/subordinados'" class="hover:text-white/60 transition">Subordinados</a>
        </li>

        <li *ngIf="!isAuthenticated">
          <a [routerLink]="'/login'" class="hover:text-white/60 transition">Login</a>
        </li>

        <li *ngIf="isAuthenticated">
          <button (click)="logout()" class="hover:text-white/60 transition">Logout</button>
        </li>
      </ul>
    </div>
  `,
})
export class Header {
  private authService = inject(Service);
  private router = inject(Router);

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
