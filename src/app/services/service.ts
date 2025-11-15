import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { environment } from '../../environments/environment.development';
import axios from 'axios';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root',
})
export class ServiceEmpleados {
  async getToken(user: Login): Promise<any> {
    const request = 'auth/login';
    const url = environment.urlApi + request;
    const response = await axios.post(url, user);
    return response.data.response;
  }

  async getPerfil(): Promise<Empleado> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    const request = 'api/empleados/perfilempleado';
    const url = environment.urlApi + request;
    const response = await axios.get(url, { headers });
    return response.data;
  }

  async getSubordinados(): Promise<Empleado[]> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    const request = 'api/Empleados/Subordinados';
    const url = environment.urlApi + request;
    const response = await axios.get(url, { headers });
    return response.data;
  }

  async getEmpleados(): Promise<Empleado[]> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    const request = 'api/empleados';
    const url = environment.urlApi + request;
    const response = await axios.get(url, { headers });
    return response.data;
  }

  async getEmpleadoById(id: number): Promise<Empleado> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    const request = `api/Empleados/${id}`;
    const url = environment.urlApi + request;
    const response = await axios.get(url, { headers });
    return response.data;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
