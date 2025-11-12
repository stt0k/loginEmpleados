import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Service } from '../../services/service';
import { Empleado } from '../../models/empleado';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule],
  template: `
    <div class="max-w-md mx-auto">
      <h2 class="text-2xl font-semibold text-white text-center mb-8">Mi Perfil</h2>

      <div *ngIf="isLoading" class="bg-zinc-800/30 border border-white/10 rounded-lg p-6">
        <p class="text-gray-400 text-center">Cargando perfil...</p>
      </div>

      <div
        *ngIf="errorMessage"
        class="bg-red-900/50 border border-red-500/50 text-red-200 p-4 rounded mb-6 text-center"
      >
        {{ errorMessage }}
        <button
          (click)="loadPerfil()"
          class="block mx-auto mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          Reintentar
        </button>
      </div>

      <div
        *ngIf="empleado && !isLoading"
        class="bg-zinc-800/30 border border-white/10 rounded-lg p-6"
      >
        <div class="space-y-4">
          <div class="flex justify-between items-center border-b border-white/10 pb-2">
            <span class="text-gray-300 font-medium">ID:</span>
            <span class="text-white">{{ empleado.idEmpleado }}</span>
          </div>

          <div class="flex justify-between items-center border-b border-white/10 pb-2">
            <span class="text-gray-300 font-medium">Apellido:</span>
            <span class="text-white">{{ empleado.apellido }}</span>
          </div>

          <div class="flex justify-between items-center border-b border-white/10 pb-2">
            <span class="text-gray-300 font-medium">Oficio:</span>
            <span class="text-white">{{ empleado.oficio }}</span>
          </div>

          <div class="flex justify-between items-center border-b border-white/10 pb-2">
            <span class="text-gray-300 font-medium">Salario:</span>
            <span class="text-green-400 font-semibold">{{ formatSalary(empleado.salario) }}</span>
          </div>

          <div class="flex justify-between items-center">
            <span class="text-gray-300 font-medium">Director:</span>
            <span class="text-white">{{ empleado.director || 'N/A' }}</span>
          </div>
        </div>

        <div class="mt-6 flex gap-3 justify-center">
          <button
            (click)="goToSubordinados()"
            class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition"
          >
            Subordinados
          </button>
          <button
            (click)="goBack()"
            class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  `,
})
export class Perfil implements OnInit {
  private authService = inject(Service);
  private router = inject(Router);

  empleado: Empleado | null = null;
  isLoading = false;
  errorMessage = '';

  ngOnInit() {
    this.loadPerfil();
  }

  async loadPerfil() {
    this.isLoading = true;
    this.errorMessage = '';

    try {
      this.empleado = await this.authService.getPerfilEmpleado();
    } catch (error) {
      this.errorMessage = 'Error al cargar el perfil. Por favor, inténtalo de nuevo.';
      console.error('Error al cargar perfil:', error);
    } finally {
      this.isLoading = false;
    }
  }

  getInitials(): string {
    if (!this.empleado?.apellido) return 'E';
    return this.empleado.apellido.substring(0, 2).toUpperCase();
  }

  formatSalary(salario: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(salario);
  }

  goToSubordinados(): void {
    this.router.navigate(['/subordinados']);
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
