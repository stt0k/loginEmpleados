import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceEmpleados } from '../../services/service';
import { CommonModule } from '@angular/common';

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
          Este sistema te permite gestionar información de empleados y subordinados. Accede con tus
          credenciales para ver tu perfil y gestionar tu equipo.
        </p>

        @if (!isAuthenticated) {
        <div class="text-center">
          <p>Inicia sesión si quieres ver el contenido</p>
        </div>
        } @else {
        <div class="flex flex-wrap gap-4 justify-center">
          <button
            (click)="goToPerfil()"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
          >
            Ver Perfil
          </button>
          <button
            (click)="router.navigate(['/subordinados'])"
            class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition"
          >
            Subordinados
          </button>
        </div>
        }
      </div>
    </div>
  `,
})
export class Home implements OnInit {
  private readonly service = inject(ServiceEmpleados);
  readonly router = inject(Router);

  isAuthenticated = false;

  ngOnInit(): void {
    this.checkAuthentication();
  }

  private checkAuthentication(): void {
    this.isAuthenticated = this.service.isAuthenticated();
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToPerfil(): void {
    this.router.navigate(['/perfil']);
  }
}
