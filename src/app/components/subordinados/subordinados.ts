import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Service } from '../../services/service';
import { Empleado } from '../../models/empleado';

@Component({
  selector: 'app-subordinados',
  imports: [CommonModule, CurrencyPipe],
  template: `
    <div class="max-w-4xl mx-auto p-6">
      <h2 class="text-2xl font-semibold text-white text-center mb-8">Mis Subordinados</h2>

      <div *ngIf="isLoading" class="bg-zinc-800/30 border border-white/10 rounded-lg p-6">
        <p class="text-gray-400 text-center">Cargando subordinados...</p>
      </div>

      <div
        *ngIf="errorMessage"
        class="bg-red-900/50 border border-red-500/50 text-red-200 p-4 rounded mb-6 text-center"
      >
        {{ errorMessage }}
        <button
          (click)="loadSubordinados()"
          class="block mx-auto mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          Reintentar
        </button>
      </div>

      <div *ngIf="!isLoading && !errorMessage">
        <div
          *ngIf="subordinados.length === 0"
          class="bg-zinc-800/30 border border-white/10 rounded-lg p-6"
        >
          <p class="text-gray-400 text-center">No tienes subordinados bajo tu supervisión.</p>
        </div>

        <div *ngIf="subordinados.length > 0" class="space-y-6">
          <!-- Resumen -->
          <div class="bg-zinc-800/30 border border-white/10 rounded-lg p-6">
            <h3 class="text-lg font-medium text-white mb-4 text-center">📊 Resumen</h3>
            <div class="grid grid-cols-3 gap-4 text-center">
              <div>
                <div class="text-2xl font-bold text-blue-400">{{ subordinados.length }}</div>
                <div class="text-gray-300 text-sm">Subordinados</div>
              </div>
              <div>
                <div class="text-2xl font-bold text-green-400">
                  {{ getTotalSalarios() | currency : 'EUR' : 'symbol' : '1.0-0' }}
                </div>
                <div class="text-gray-300 text-sm">Total Salarios</div>
              </div>
              <div>
                <div class="text-2xl font-bold text-purple-400">
                  {{ getPromedioSalario() | currency : 'EUR' : 'symbol' : '1.0-0' }}
                </div>
                <div class="text-gray-300 text-sm">Promedio</div>
              </div>
            </div>
          </div>

          <!-- Lista de subordinados -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              *ngFor="let empleado of subordinados; trackBy: trackByEmpleado"
              class="bg-zinc-800/30 border border-white/10 rounded-lg p-4"
            >
              <div class="mb-4">
                <h4 class="text-lg font-medium text-white">{{ empleado.apellido }}</h4>
                <p class="text-gray-300 text-sm">{{ empleado.oficio }}</p>
                <span class="text-xs text-gray-400">ID: {{ empleado.idEmpleado }}</span>
              </div>

              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-300">Salario:</span>
                  <span class="text-green-400 font-semibold">{{
                    empleado.salario | currency : 'EUR' : 'symbol' : '1.0-0'
                  }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-300">Director:</span>
                  <span class="text-white">{{ empleado.director || 'N/A' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8 text-center">
        <div class="flex gap-3 justify-center">
          <button
            (click)="goToPerfil()"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
          >
            Mi Perfil
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
export class Subordinados implements OnInit {
  private authService = inject(Service);
  private router = inject(Router);

  subordinados: Empleado[] = [];
  isLoading = false;
  errorMessage = '';

  ngOnInit() {
    this.loadSubordinados();
  }

  async loadSubordinados() {
    this.isLoading = true;
    this.errorMessage = '';

    try {
      this.subordinados = await this.authService.getSubordinados();
    } catch (error) {
      this.errorMessage = 'Error al cargar los subordinados. Por favor, inténtalo de nuevo.';
      console.error('Error al cargar subordinados:', error);
    } finally {
      this.isLoading = false;
    }
  }

  getInitials(apellido: string): string {
    if (!apellido) return 'E';
    return apellido.substring(0, 2).toUpperCase();
  }

  getTotalSalarios(): number {
    return this.subordinados.reduce((total, emp) => total + emp.salario, 0);
  }

  getPromedioSalario(): number {
    if (this.subordinados.length === 0) return 0;
    return this.getTotalSalarios() / this.subordinados.length;
  }

  trackByEmpleado(index: number, empleado: Empleado): number {
    return empleado.idEmpleado;
  }

  goToPerfil(): void {
    this.router.navigate(['/perfil']);
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
