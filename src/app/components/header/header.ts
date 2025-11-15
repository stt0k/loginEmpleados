import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ServiceEmpleados } from '../../services/service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  template: `
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

            @if (isAuthenticated()) {
            <a
              routerLink="/perfil"
              routerLinkActive="text-blue-400"
              class="text-white hover:text-blue-400 px-3 py-2 rounded transition"
            >
              Mi Perfil
            </a>

            <a
              routerLink="/subordinados"
              routerLinkActive="text-blue-400"
              class="text-white hover:text-blue-400 px-3 py-2 rounded transition"
            >
              Subordinados
            </a>

            <button
              (click)="logout()"
              class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
            >
              Cerrar Sesión
            </button>
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
            (click)="toggleMenu()"
            [class.text-blue-400]="isMenuOpen()"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              @if (!isMenuOpen()) {
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
              } @else {
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
              }
            </svg>
          </button>
        </div>

        @if (isMenuOpen()) {
        <div class="md:hidden pb-4">
          <div class="flex flex-col space-y-2">
            <a
              routerLink="/"
              routerLinkActive="text-blue-400"
              [routerLinkActiveOptions]="{ exact: true }"
              class="text-white hover:text-blue-400 px-3 py-2 rounded transition"
              (click)="closeMenu()"
            >
              Inicio
            </a>

            @if (isAuthenticated()) {
            <a
              routerLink="/perfil"
              routerLinkActive="text-blue-400"
              class="text-white hover:text-blue-400 px-3 py-2 rounded transition"
              (click)="closeMenu()"
            >
              Mi Perfil
            </a>

            <a
              routerLink="/subordinados"
              routerLinkActive="text-blue-400"
              class="text-white hover:text-blue-400 px-3 py-2 rounded transition"
              (click)="closeMenu()"
            >
              Subordinados
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
              (click)="closeMenu()"
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
  private readonly service = inject(ServiceEmpleados);
  private readonly router = inject(Router);

  isAuthenticated = signal(false);
  isMenuOpen = signal(false);

  ngOnInit(): void {
    this.checkAuthentication();
    // Escuchar cambios en la autenticación
    this.router.events.subscribe(() => {
      this.checkAuthentication();
    });
  }

  private checkAuthentication(): void {
    this.isAuthenticated.set(this.service.isAuthenticated());
  }

  toggleMenu(): void {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  logout(): void {
    this.service.logout();
    this.checkAuthentication();
    this.closeMenu();
    this.router.navigate(['/']);
  }
}
