import { Component, inject, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { ServiceFutbol } from '../../services/service';
import { Equipo } from '../../models/equipo';
import { Jugador } from '../../models/jugador';

@Component({
  selector: 'app-detalleequipo',
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-zinc-900 p-6">
      <div class="max-w-6xl mx-auto">
        <!-- Botón de regreso -->
        <div class="mb-6">
          <button
            (click)="goBack()"
            class="inline-flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Volver
          </button>
        </div>

        <!-- Contenido del equipo -->
        @if (equipo) {
        <div class="space-y-8">
          <!-- Header con información principal -->
          <div class="bg-zinc-800/50 rounded-lg shadow-xl overflow-hidden">
            <div class="bg-zinc-700/50 px-8 py-6">
              <div class="flex flex-col lg:flex-row items-center gap-6">
                <div class="shrink-0">
                  <img
                    [src]="equipo.imagen"
                    [alt]="equipo.nombre"
                    class="w-32 h-32 rounded-lg object-cover border-4 border-zinc-600"
                    (error)="handleImageError($event)"
                  />
                </div>
                <div class="text-center lg:text-left flex-1">
                  <h1 class="text-4xl font-bold text-white mb-4">
                    {{ equipo.nombre }}
                  </h1>
                  <div class="flex flex-wrap gap-4 justify-center lg:justify-start">
                    <div
                      class="flex items-center gap-2 bg-yellow-600/20 text-yellow-400 px-4 py-2 rounded-full border border-yellow-500/30"
                    >
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span class="font-semibold">{{ equipo.champions }} Champions League</span>
                    </div>
                    <div
                      class="flex items-center gap-2 bg-gray-600/20 text-gray-400 px-4 py-2 rounded-full border border-gray-500/30"
                    >
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fill-rule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span class="font-semibold">{{ equipo.finalista }} Finales</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-8">
              <!-- Información del equipo -->
              <div class="space-y-4">
                <h2 class="text-2xl font-semibold text-white mb-4">ℹ️ Información del Equipo</h2>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div class="bg-zinc-700/30 rounded-lg p-4">
                    <label class="text-zinc-400 text-sm font-medium">ID Equipo</label>
                    <p class="text-white text-lg font-semibold">
                      {{ equipo.idEquipo }}
                    </p>
                  </div>

                  <div class="bg-zinc-700/30 rounded-lg p-4">
                    <label class="text-zinc-400 text-sm font-medium">Nombre</label>
                    <p class="text-white text-lg font-semibold">
                      {{ equipo.nombre }}
                    </p>
                  </div>

                  @if (equipo.web) {
                  <div class="bg-zinc-700/30 rounded-lg p-4">
                    <label class="text-zinc-400 text-sm font-medium">Sitio Web</label>
                    <a
                      [href]="equipo.web"
                      target="_blank"
                      class="text-blue-400 hover:text-blue-300 text-lg font-semibold inline-flex items-center gap-2"
                    >
                      {{ equipo.web }}
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                  }
                </div>
              </div>

              <!-- Descripción -->
              @if (equipo.descripcion) {
              <div class="mt-8">
                <h2 class="text-2xl font-semibold text-white mb-4">📖 Descripción</h2>
                <div class="bg-zinc-700/30 rounded-lg p-6">
                  <p class="text-zinc-300 text-lg leading-relaxed">
                    {{ equipo.descripcion }}
                  </p>
                </div>
              </div>
              }
            </div>
          </div>

          <!-- Jugadores del equipo -->
          <div class="bg-zinc-800/50 rounded-lg shadow-xl overflow-hidden">
            <div class="bg-zinc-700/50 px-8 py-4">
              <h2 class="text-2xl font-semibold text-white">👥 Jugadores del Equipo</h2>
            </div>

            @if (jugadores.length > 0) {
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
                        (error)="handlePlayerImageError($event)"
                      />
                    </td>
                    <td class="px-6 py-4">
                      <div class="text-white font-medium">
                        {{ jugador.nombre }}
                      </div>
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
            } @else {
            <!-- Mensaje cuando no hay jugadores -->
            <div class="text-center py-12">
              <div class="text-zinc-400 text-lg">
                👤 No hay jugadores disponibles para este equipo
              </div>
            </div>
            }
          </div>
        </div>
        } @else {
        <!-- Loading state -->
        <div class="text-center py-12">
          <div class="text-zinc-400 text-lg">⏳ Cargando detalles del equipo...</div>
        </div>
        }
      </div>
    </div>
  `,
})
export class Detalleequipo implements OnInit, OnChanges {
  serviceFutbol = inject(ServiceFutbol);
  location = inject(Location);

  // El ! es para cambiar de string a number
  @Input() id!: string;

  equipo: Equipo | null = null;
  jugadores: Jugador[] = [];

  ngOnInit(): void {
    this.cargarDatos();
  }

  // para que cuando se cambie de id se actualice
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] && changes['id'].currentValue) {
      this.cargarDatos();
    }
  }

  private cargarDatos(): void {
    if (this.id) {
      this.cargarDetallesEquipo(Number(this.id));
      this.cargarJugadoresEquipo(Number(this.id));
    }
  }

  async cargarDetallesEquipo(id: number): Promise<void> {
    const data = await this.serviceFutbol.getEquipoById(id);
    this.equipo = data;
  }

  async cargarJugadoresEquipo(id: number): Promise<void> {
    const data = await this.serviceFutbol.getJugadoresPorEquipo(id);
    this.jugadores = data;
  }

  goBack(): void {
    this.location.back();
  }

  handleImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'https://via.placeholder.com/128x128/4a5568/ffffff?text=⚽';
  }

  handlePlayerImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'https://via.placeholder.com/48x48/4a5568/ffffff?text=?';
  }
}
