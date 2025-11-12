import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Login, LoginResponse } from '../models/login';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root',
})
export class Service {
  private apiAuth = environment.apiEmpleadosLogin;
  private tokenKey = 'empleado_token';

  constructor() {}

  // Métodos para manejo del token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null && token !== '';
  }

  // Método para obtener headers con autorización
  private getAuthHeaders(): HeadersInit {
    const token = this.getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  async loginEmpleado(user: Login): Promise<LoginResponse> {
    try {
      const response = await fetch(`${this.apiAuth}auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const responseText = await response.text();

      if (responseText) {
        const data: LoginResponse = JSON.parse(responseText);

        // Si la respuesta contiene un token, lo guardamos
        if (data.token) {
          this.setToken(data.token);
        }

        return data;
      } else {
        throw new Error('Respuesta vacía del servidor');
      }
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  async getPerfilEmpleado(): Promise<Empleado> {
    try {
      const response = await fetch(`${this.apiAuth}api/empleados/perfilempleado`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: Empleado = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      throw error;
    }
  }

  async getSubordinados(): Promise<Empleado[]> {
    try {
      const response = await fetch(`${this.apiAuth}api/empleados/subordinados`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: Empleado[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener subordinados:', error);
      throw error;
    }
  }

  logout(): void {
    this.removeToken();
  }
}
