import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Perfil } from './components/perfil/perfil';
import { Subordinados } from './components/subordinados/subordinados';
import { Jugadores } from './components/jugadores/jugadores';
import { Detallejugador } from './components/detallejugador/detallejugador';
import { Detalleequipo } from './components/detalleequipo/detalleequipo';
import { Apuestas } from './components/apuestas/apuestas';
import { Crearapuestas } from './components/crearapuestas/crearapuestas';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'jugadores', component: Jugadores },
  { path: 'jugadores/:id', component: Detallejugador },
  { path: 'equipos/:id', component: Detalleequipo },
  { path: 'perfil', component: Perfil },
  { path: 'subordinados', component: Subordinados },
  { path: 'mis-apuestas', component: Apuestas },
  { path: 'crear-apuesta', component: Crearapuestas },
  { path: '**', redirectTo: '' },
];
