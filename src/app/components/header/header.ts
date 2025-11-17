import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ServiceEmpleados, ServiceFutbol } from '../../services/service';
import { Equipo } from '../../models/equipo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Overlay para cerrar dropdowns -->
    @if (isPrimaryDropdownOpen || isUserDropdownOpen) {
    <div (click)="closeAllDropdowns()" class="fixed inset-0 z-40"></div>
    }

    <nav class="bg-zinc-900/50 border-b border-white/10 sticky top-0 z-50">
      <div class="max-w-6xl mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <a routerLink="/" class="flex items-center text-white hover:text-blue-400 transition">
              <span class="font-bold text-lg">Sistema Empleados</span>
            </a>
          </div>

          <div class="hidden md:flex items-center space-x-4">
            <a
              routerLink="/"
              routerLinkActive="text-blue-400"
              [routerLinkActiveOptions]="{ exact: true }"
              class="text-white hover:text-blue-400 px-3 py-2 rounded transition"
            >
              Inicio
            </a>

            <a
              routerLink="/jugadores"
              routerLinkActive="text-blue-400"
              class="text-white hover:text-blue-400 px-3 py-2 rounded transition"
            >
              Jugadores
            </a>

            <!-- Dropdown de Equipos -->
            <div class="relative">
              <button
                (click)="togglePrimaryDropdown()"
                class="text-white hover:text-blue-400 px-3 py-2 rounded transition flex items-center gap-1"
                [class.text-blue-400]="isPrimaryDropdownOpen"
              >
                Equipos
                <svg
                  class="w-4 h-4 transition-transform"
                  [class.rotate-180]="isPrimaryDropdownOpen"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <!-- Dropdown Menu Equipos -->
              @if (isPrimaryDropdownOpen) {
              <div
                class="absolute top-full left-0 mt-2 w-64 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto"
              >
                <div class="py-2">
                  @for (equipo of equipos; track equipo.idEquipo) {
                  <a
                    [routerLink]="['/equipos', equipo.idEquipo]"
                    (click)="closePrimaryDropdown()"
                    class="flex items-center gap-3 px-4 py-3 text-white hover:bg-zinc-700 transition-colors"
                  >
                    @if (equipo.imagen) {
                    <img
                      [src]="equipo.imagen"
                      [alt]="equipo.nombre"
                      class="w-8 h-8 rounded object-cover shrink-0"
                      (error)="handleImageError($event)"
                    />
                    } @else {
                    <div
                      class="w-8 h-8 bg-zinc-600 rounded flex items-center justify-center shrink-0"
                    >
                      ⚽
                    </div>
                    }
                    <div class="flex-1 min-w-0">
                      <div class="font-medium truncate">
                        {{ equipo.nombre }}
                      </div>
                    </div>
                  </a>
                  } @if (equipos.length === 0) {
                  <div class="px-4 py-3 text-zinc-400">No hay equipos disponibles</div>
                  }
                </div>
              </div>
              }
            </div>

            @if (isAuthenticated) {
            <a
              routerLink="/subordinados"
              routerLinkActive="text-blue-400"
              class="text-white hover:text-blue-400 px-3 py-2 rounded transition"
            >
              Subordinados
            </a>

            <!-- Dropdown de Usuario -->
            <div class="relative">
              <button
                (click)="toggleSecondaryDropdown()"
                class="text-white hover:text-blue-400 px-3 py-2 rounded transition flex items-center gap-1"
                [class.text-blue-400]="isUserDropdownOpen"
              >
                👤 Mi Cuenta
                <svg
                  class="w-4 h-4 transition-transform"
                  [class.rotate-180]="isUserDropdownOpen"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <!-- Dropdown Menu Usuario -->
              @if (isUserDropdownOpen) {
              <div
                class="absolute top-full right-0 mt-2 w-48 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl z-50"
              >
                <div class="py-2">
                  <a
                    routerLink="/perfil"
                    (click)="closeSecondaryDropdown()"
                    class="flex items-center gap-3 px-4 py-3 text-white hover:bg-zinc-700 transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Mi Perfil
                  </a>

                  <a
                    routerLink="/mis-apuestas"
                    (click)="closeSecondaryDropdown()"
                    class="flex items-center gap-3 px-4 py-3 text-white hover:bg-zinc-700 transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    Mis Apuestas
                  </a>

                  <a
                    routerLink="/crear-apuesta"
                    (click)="closeSecondaryDropdown()"
                    class="flex items-center gap-3 px-4 py-3 text-white hover:bg-zinc-700 transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Crear Apuesta
                  </a>

                  <hr class="my-2 border-zinc-700" />

                  <button
                    (click)="logout()"
                    class="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-zinc-700 transition-colors w-full text-left"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Cerrar Sesión
                  </button>
                </div>
              </div>
              }
            </div>
            } @else {
            <a
              routerLink="/login"
              routerLinkActive="bg-blue-700"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
              Iniciar Sesión
            </a>
            }
          </div>

          <button
            class="md:hidden text-white focus:outline-none"
            (click)="toggleMobileMenu()"
            [class.text-blue-400]="isMobileMenuOpen"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              @if (!isMobileMenuOpen) {
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              } @else {
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
              }
            </svg>
          </button>
        </div>

        @if (isMobileMenuOpen) {
        <div class="md:hidden pb-4">
          <div class="flex flex-col space-y-2">
            <a
              routerLink="/"
              routerLinkActive="text-blue-400"
              [routerLinkActiveOptions]="{ exact: true }"
              class="text-white hover:text-blue-400 px-3 py-2 rounded transition"
              (click)="closeMobileMenu()"
            >
              Inicio
            </a>

            <a
              routerLink="/jugadores"
              routerLinkActive="text-blue-400"
              class="text-white hover:text-blue-400 px-3 py-2 rounded transition"
              (click)="closeMobileMenu()"
            >
              Jugadores
            </a>

            <!-- Equipos en menú móvil -->
            <div>
              <button
                (click)="togglePrimaryDropdown()"
                class="text-white hover:text-blue-400 px-3 py-2 rounded transition flex items-center gap-1 w-full text-left"
                [class.text-blue-400]="isPrimaryDropdownOpen"
              >
                Equipos
                <svg
                  class="w-4 h-4 transition-transform"
                  [class.rotate-180]="isPrimaryDropdownOpen"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              @if (isPrimaryDropdownOpen) {
              <div class="pl-6 space-y-1 mt-2">
                @for (equipo of equipos; track equipo.idEquipo) {
                <a
                  [routerLink]="['/equipos', equipo.idEquipo]"
                  (click)="closeMobileMenu()"
                  class="flex items-center gap-3 px-3 py-2 text-zinc-300 hover:text-white hover:bg-zinc-700 rounded transition-colors"
                >
                  @if (equipo.imagen) {
                  <img
                    [src]="equipo.imagen"
                    [alt]="equipo.nombre"
                    class="w-6 h-6 rounded object-cover"
                    (error)="handleImageError($event)"
                  />
                  }
                  <div class="flex-1 min-w-0">
                    <div class="font-medium truncate text-sm">
                      {{ equipo.nombre }}
                    </div>
                  </div>
                </a>
                }
              </div>
              }
            </div>

            @if (isAuthenticated) {
            <a
              routerLink="/perfil"
              routerLinkActive="text-blue-400"
              class="text-white hover:text-blue-400 px-3 py-2 rounded transition"
              (click)="closeMobileMenu()"
            >
              Mi Perfil
            </a>

            <a
              routerLink="/subordinados"
              routerLinkActive="text-blue-400"
              class="text-white hover:text-blue-400 px-3 py-2 rounded transition"
              (click)="closeMobileMenu()"
            >
              Subordinados
            </a>

            <a
              routerLink="/mis-apuestas"
              routerLinkActive="text-blue-400"
              class="text-white hover:text-blue-400 px-3 py-2 rounded transition"
              (click)="closeMobileMenu()"
            >
              Mis Apuestas
            </a>

            <a
              routerLink="/crear-apuesta"
              routerLinkActive="text-blue-400"
              class="text-white hover:text-blue-400 px-3 py-2 rounded transition"
              (click)="closeMobileMenu()"
            >
              Crear Apuesta
            </a>

            <button
              (click)="logout()"
              class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition text-left"
            >
              Cerrar Sesión
            </button>
            } @else {
            <a
              routerLink="/login"
              routerLinkActive="bg-blue-700"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition inline-block text-center"
              (click)="closeMobileMenu()"
            >
              Iniciar Sesión
            </a>
            }
          </div>
        </div>
        }
      </div>
    </nav>
  `,
})
export class Header implements OnInit {
  serviceEmpleados = inject(ServiceEmpleados);
  serviceFutbol = inject(ServiceFutbol);
  router = inject(Router);

  // Estado del header
  isMobileMenuOpen = false;
  isAuthenticated = false;
  isPrimaryDropdownOpen = false;
  isUserDropdownOpen = false;
  equipos: Equipo[] = [];

  ngOnInit(): void {
    this.checkAuthentication();
    this.loadPrimaryData();
    // Escuchar cambios en las rutas (cuando usuario navega entre paginas verificar
    // si sigue autenticado o si su sesion expiró)
    this.router.events.subscribe(() => {
      this.checkAuthentication();
    });
  }

  checkAuthentication(): void {
    this.isAuthenticated = this.serviceEmpleados.isAuthenticated();
  }

  // MÉTODOS DE DATOS - SEPARADOS PARA FÁCIL IDENTIFICACIÓN
  async loadPrimaryData(): Promise<void> {
    const data = await this.serviceFutbol.getEquipos();
    this.equipos = data;
  }

  // MÉTODOS DROPDOWN - GENÉRICOS PARA COPIAR
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.isPrimaryDropdownOpen = false;
    this.isUserDropdownOpen = false;
  }

  togglePrimaryDropdown(): void {
    this.isPrimaryDropdownOpen = !this.isPrimaryDropdownOpen;
    this.isUserDropdownOpen = false;
  }

  toggleSecondaryDropdown(): void {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
    this.isPrimaryDropdownOpen = false;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    this.isPrimaryDropdownOpen = false;
    this.isUserDropdownOpen = false;
  }

  closePrimaryDropdown(): void {
    this.isPrimaryDropdownOpen = false;
  }

  closeSecondaryDropdown(): void {
    this.isUserDropdownOpen = false;
  }

  closeAllDropdowns(): void {
    this.isPrimaryDropdownOpen = false;
    this.isUserDropdownOpen = false;
  }

  // MÉTODOS ADICIONALES
  handleImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.style.display = 'none';
  }

  logout(): void {
    this.serviceEmpleados.logout();
    this.checkAuthentication();
    this.closeMobileMenu();
    this.router.navigate(['/']);
  }
}
