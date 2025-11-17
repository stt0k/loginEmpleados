import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceEmpleados } from '../../services/service';
import { Empleado } from '../../models/empleado';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subordinados',
  imports: [CommonModule],
  template: `
    <div class="max-w-6xl mx-auto p-6">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-2xl font-semibold text-white">Mis Subordinados</h2>
        <button
          (click)="volverPerfil()"
          class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition"
        >
          ← Volver al Perfil
        </button>
      </div>

      @if (subordinados.length === 0) {
      <div class="bg-zinc-800/30 border border-white/10 rounded-lg p-8 text-center">
        <p class="text-white text-lg">No tiene subordinados a su cargo.</p>
      </div>
      } @else {
      <div class="bg-zinc-800/30 border border-white/10 rounded-lg overflow-hidden mb-6">
        <table class="w-full">
          <thead class="bg-zinc-900/50">
            <tr>
              <th class="px-4 py-3 text-left text-white">ID</th>
              <th class="px-4 py-3 text-left text-white">Apellido</th>
              <th class="px-4 py-3 text-left text-white">Oficio</th>
              <th class="px-4 py-3 text-left text-white">Salario</th>
              <th class="px-4 py-3 text-left text-white">Director</th>
            </tr>
          </thead>
          <tbody>
            @for (subordinado of subordinados; track subordinado.idEmpleado) {
            <tr class="border-t border-white/10 hover:bg-zinc-700/30">
              <td class="px-4 py-3 text-white">{{ subordinado.idEmpleado }}</td>
              <td class="px-4 py-3 text-white font-medium">{{ subordinado.apellido }}</td>
              <td class="px-4 py-3 text-white">{{ subordinado.oficio }}</td>
              <td class="px-4 py-3 text-green-400 font-semibold">
                {{ subordinado.salario | currency : 'EUR' : 'symbol' : '1.2-2' }}
              </td>
              <td class="px-4 py-3 text-white">{{ subordinado.director }}</td>
            </tr>
            }
          </tbody>
        </table>
      </div>

      <div class="bg-zinc-800/30 border border-white/10 rounded-lg p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
          <div>
            <p class="text-gray-300 mb-2">Total de subordinados:</p>
            <p class="text-white text-2xl font-bold">{{ subordinados.length }}</p>
          </div>
          <div>
            <p class="text-gray-300 mb-2">Salario total del equipo:</p>
            <p class="text-green-400 text-2xl font-bold">
              {{ calcularSalarioTotal() | currency : 'EUR' : 'symbol' : '1.2-2' }}
            </p>
          </div>
        </div>
      </div>
      }
    </div>
  `,
})
export class Subordinados implements OnInit {
  service = inject(ServiceEmpleados);
  router = inject(Router);

  subordinados: Empleado[] = [];

  ngOnInit(): void {
    this.verificarToken();
  }

  verificarToken(): void {
    if (!this.service.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    this.cargarSubordinados();
  }

  async cargarSubordinados(): Promise<void> {
    const subordinados = await this.service.getSubordinados();
    this.subordinados = subordinados;
  }

  calcularSalarioTotal(): number {
    return this.subordinados.reduce(
      (total: number, subordinado: any) => total + subordinado.salario,
      0
    );
  }

  volverPerfil(): void {
    this.router.navigate(['/perfil']);
  }
}
