import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceEmpleados } from '../../services/service';
import { Empleado } from '../../models/empleado';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule],
  template: `
    <div class="max-w-4xl mx-auto p-6">
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-white">Mi Perfil</h2>
      </div>

      @if (empleado) {
      <div class="bg-zinc-800/30 border border-white/10 rounded-lg overflow-hidden mb-6">
        <div class="bg-zinc-900/50 px-6 py-4 border-b border-white/10">
          <h3 class="text-lg font-semibold text-white">Información Personal</h3>
        </div>

        <div class="p-6 space-y-4">
          <div class="flex justify-between items-center py-3 border-b border-white/10">
            <span class="text-gray-300 font-medium">ID Empleado:</span>
            <span class="text-white">{{ empleado.idEmpleado }}</span>
          </div>

          <div class="flex justify-between items-center py-3 border-b border-white/10">
            <span class="text-gray-300 font-medium">Apellido:</span>
            <span class="text-white">{{ empleado.apellido }}</span>
          </div>

          <div class="flex justify-between items-center py-3 border-b border-white/10">
            <span class="text-gray-300 font-medium">Oficio:</span>
            <span class="text-white">{{ empleado.oficio }}</span>
          </div>

          <div class="flex justify-between items-center py-3 border-b border-white/10">
            <span class="text-gray-300 font-medium">Salario:</span>
            <span class="text-green-400 font-semibold">{{
              empleado.salario | currency : 'EUR' : 'symbol' : '1.2-2'
            }}</span>
          </div>

          <div class="flex justify-between items-center py-3">
            <span class="text-gray-300 font-medium">Director:</span>
            <span class="text-white">{{ empleado.director }}</span>
          </div>
        </div>
      </div>

      <div class="text-center">
        <button
          (click)="verSubordinados()"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
        >
          Ver Subordinados
        </button>
      </div>
      }
    </div>
  `,
})
export class Perfil implements OnInit {
  service = inject(ServiceEmpleados);
  router = inject(Router);

  empleado: Empleado | null = null;

  ngOnInit(): void {
    this.verificarToken();
  }

  verificarToken(): void {
    if (!this.service.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    this.cargarPerfil();
  }

  async cargarPerfil(): Promise<void> {
    const perfil = await this.service.getPerfil();
    this.empleado = perfil;
  }

  verSubordinados(): void {
    this.router.navigate(['/subordinados']);
  }
}
