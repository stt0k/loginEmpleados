import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Service } from '../../services/service';
import { Login as LoginModel } from '../../models/login';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  template: `
    <div class="max-w-md mx-auto">
      <h2 class="text-2xl font-semibold text-white text-center mb-8">Iniciar Sesión</h2>

      <div class="bg-zinc-800/30 border border-white/10 rounded-lg p-6">
        <form (ngSubmit)="onLogin()" #loginForm="ngForm">
          <div class="space-y-4">
            <div>
              <label for="userName" class="block text-gray-300 font-medium mb-2">Usuario:</label>
              <input
                type="text"
                id="userName"
                name="userName"
                [(ngModel)]="loginData.userName"
                required
                #userName="ngModel"
                class="w-full px-3 py-2 bg-zinc-900/50 border border-white/20 rounded text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder="Ingrese su usuario"
              />
              <div *ngIf="userName.invalid && userName.touched" class="text-red-400 text-sm mt-1">
                El usuario es requerido
              </div>
            </div>

            <div>
              <label for="password" class="block text-gray-300 font-medium mb-2">Contraseña:</label>
              <input
                type="password"
                id="password"
                name="password"
                [(ngModel)]="loginData.password"
                required
                #password="ngModel"
                class="w-full px-3 py-2 bg-zinc-900/50 border border-white/20 rounded text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder="Ingrese su contraseña"
              />
              <div *ngIf="password.invalid && password.touched" class="text-red-400 text-sm mt-1">
                La contraseña es requerida
              </div>
            </div>

            <button
              type="submit"
              [disabled]="loginForm.invalid || isLoading"
              class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded transition"
            >
              {{ isLoading ? 'Iniciando...' : 'Iniciar Sesión' }}
            </button>

            <div
              *ngIf="errorMessage"
              class="bg-red-900/50 border border-red-500/50 text-red-200 p-3 rounded text-center"
            >
              {{ errorMessage }}
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class Login {
  private authService = inject(Service);
  private router = inject(Router);

  loginData: LoginModel = {
    userName: '',
    password: '',
  };

  isLoading = false;
  errorMessage = '';

  async onLogin() {
    if (this.loginData.userName && this.loginData.password) {
      this.isLoading = true;
      this.errorMessage = '';

      try {
        const response = await this.authService.loginEmpleado(this.loginData);

        if (response.token) {
          // Login exitoso, redirigir al home o dashboard
          this.router.navigate(['/perfil']);
        } else {
          this.errorMessage = 'Credenciales incorrectas';
        }
      } catch (error) {
        this.errorMessage = 'Error al iniciar sesión. Por favor, inténtalo de nuevo.';
        console.error('Error en login:', error);
      } finally {
        this.isLoading = false;
      }
    }
  }
}
