import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServiceFutbol } from '../../services/service';
import { Jugador } from '../../models/jugador';

@Component({
  selector: 'app-jugadores',
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-zinc-900 p-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-white mb-4">⚽ Jugadores</h1>
          <p class="text-zinc-300 text-lg">Lista completa de jugadores</p>
        </div>

        <!-- Tabla de jugadores -->
        <div class="bg-zinc-800/50 rounded-lg shadow-xl overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-zinc-700/50">
                <tr>
                  <th
                    class="px-6 py-4 text-left text-sm font-semibold text-zinc-300 uppercase tracking-wider"
                  >
                    Imagen
                  </th>
                  <th
                    class="px-6 py-4 text-left text-sm font-semibold text-zinc-300 uppercase tracking-wider"
                  >
                    Nombre
                  </th>
                  <th
                    class="px-6 py-4 text-left text-sm font-semibold text-zinc-300 uppercase tracking-wider"
                  >
                    Posición
                  </th>
                  <th
                    class="px-6 py-4 text-left text-sm font-semibold text-zinc-300 uppercase tracking-wider"
                  >
                    País
                  </th>
                  <th
                    class="px-6 py-4 text-left text-sm font-semibold text-zinc-300 uppercase tracking-wider"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-zinc-700/50">
                @for (jugador of jugadores; track jugador.idJugador) {
                <tr class="hover:bg-zinc-700/30 transition-colors">
                  <td class="px-6 py-4">
                    <img
                      [src]="jugador.imagen"
                      [alt]="jugador.nombre"
                      class="w-12 h-12 rounded-full object-cover border-2 border-zinc-600"
                      (error)="handleImageError($event)"
                    />
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-white font-medium">{{ jugador.nombre }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <span
                      class="px-3 py-1 text-xs font-semibold rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30"
                    >
                      {{ jugador.posicion }}
                    </span>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-zinc-300">{{ jugador.pais }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <a
                      [routerLink]="['/jugadores', jugador.idJugador]"
                      class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-2"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      Detalles
                    </a>
                  </td>
                </tr>
                }
              </tbody>
            </table>
          </div>

          <!-- Mensaje cuando no hay jugadores -->
          @if (jugadores.length === 0) {
          <div class="text-center py-12">
            <div class="text-zinc-400 text-lg">🚫 No se encontraron jugadores</div>
          </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class Jugadores implements OnInit {
  serviceFutbol = inject(ServiceFutbol);

  jugadores: Jugador[] = [];

  ngOnInit(): void {
    this.cargarJugadores();
  }

  async cargarJugadores(): Promise<void> {
    const data = await this.serviceFutbol.getJugadores();
    this.jugadores = data;
  }

  handleImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'https://via.placeholder.com/48x48/4a5568/ffffff?text=?';
  }
}
