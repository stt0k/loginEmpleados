import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Service } from '../../services/service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  template: `
    <div class="max-w-4xl mx-auto p-6">
      <h1 class="text-3xl font-semibold text-white text-center mb-8">
        Sistema de Gestión de Empleados
      </h1>

      <div class="bg-zinc-800/30 border border-white/10 rounded-lg p-6 mb-8">
        <h2 class="text-xl font-medium text-white mb-4">Bienvenido</h2>
        <p class="text-gray-300 mb-6">
          Este sistema te permite gestionar información de empleados y subordinados.
        </p>

        <div *ngIf="!isAuthenticated" class="text-center">
          <button
            (click)="goToLogin()"
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
          >
            Iniciar Sesión
          </button>
        </div>

        <div *ngIf="isAuthenticated" class="flex gap-4 justify-center">
          <button
            (click)="goToPerfil()"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
          >
            Ver Perfil
          </button>
          <button
            (click)="goToSubordinados()"
            class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition"
          >
            Subordinados
          </button>
          <button
            (click)="logout()"
            class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  `,
})
export class Home {
  private authService = inject(Service);
  private router = inject(Router);

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToPerfil(): void {
    this.router.navigate(['/perfil']);
  }

  goToSubordinados(): void {
    this.router.navigate(['/subordinados']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
