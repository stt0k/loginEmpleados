import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { environment } from '../../environments/environment.development';
import axios from 'axios';
import { Empleado } from '../models/empleado';
import { Jugador } from '../models/jugador';
import { Equipo } from '../models/equipo';
import { Apuesta } from '../models/apuesta';

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

@Injectable({
  providedIn: 'root',
})
export class ServiceFutbol {
  // JUGADORES
  async getJugadores(): Promise<Jugador[]> {
    const request = 'api/jugadores';
    const url = environment.URL_FUTBOL + request;
    const response = await axios.get(url);
    return response.data;
  }

  async getJugadorById(id: number): Promise<Jugador> {
    const request = `api/jugadores/${id}`;
    const url = environment.URL_FUTBOL + request;
    const response = await axios.get(url);
    return response.data;
  }

  async getJugadoresPorEquipo(idEquipo: number): Promise<Jugador[]> {
    const jugadores = await this.getJugadores();
    return jugadores.filter((jugador) => jugador.idEquipo === parseInt(idEquipo.toString()));
  }

  async buscarJugadores(nombreJugador: string): Promise<Jugador[]> {
    const request = `api/jugadores/buscarjugadores/${nombreJugador}`;
    const url = environment.URL_FUTBOL + request;
    const response = await axios.get(url);
    return response.data;
  }

  async createJugador(jugador: Jugador): Promise<Jugador> {
    const request = 'api/jugadores';
    const url = environment.URL_FUTBOL + request;
    const response = await axios.post(url, jugador);
    return response.data;
  }

  async updateJugador(idJugador: number, idEquipo: number): Promise<any> {
    const request = `api/jugadores/${idJugador}/${idEquipo}`;
    const url = environment.URL_FUTBOL + request;
    const response = await axios.put(url);
    return response.data;
  }

  async deleteJugador(id: number): Promise<any> {
    const request = `api/jugadores/${id}`;
    const url = environment.URL_FUTBOL + request;
    const response = await axios.delete(url);
    return response.data;
  }

  // EQUIPOS
  async getEquipos(): Promise<Equipo[]> {
    const request = 'api/equipos';
    const url = environment.URL_FUTBOL + request;
    const response = await axios.get(url);
    return response.data;
  }

  async getEquipoById(id: number): Promise<Equipo> {
    const request = `api/equipos/${id}`;
    const url = environment.URL_FUTBOL + request;
    const response = await axios.get(url);
    return response.data;
  }

  async createEquipo(equipo: Equipo): Promise<Equipo> {
    const request = 'api/equipos';
    const url = environment.URL_FUTBOL + request;
    const response = await axios.post(url, equipo);
    return response.data;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ServiceApuestas {
  // APUESTAS
  async getApuestas(): Promise<Apuesta[]> {
    const request = 'api/apuestas';
    const url = environment.URL_FUTBOL + request;
    const response = await axios.get(url);
    return response.data;
  }

  async createApuesta(apuesta: Apuesta): Promise<Apuesta> {
    const request = 'api/apuestas';
    const url = environment.URL_FUTBOL + request;
    const response = await axios.post(url, apuesta);
    return response.data;
  }

  async deleteApuesta(id: number): Promise<any> {
    const request = `api/apuestas/${id}`;
    const url = environment.URL_FUTBOL + request;
    const response = await axios.delete(url);
    return response.data;
  }
}
