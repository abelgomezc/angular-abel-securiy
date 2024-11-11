import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { FacturaDTO } from '../interfaces/FacturaDTO ';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private http = inject(HttpClient);
  private readonly url:string = environment.urlApi;

  // Método para obtener el token almacenado en el sessionStorage
  private getToken(): string | null {
    return sessionStorage.getItem('jwt');
  }


  getFacturas(): Observable<FacturaDTO[]> {
    const token = this.getToken();

    // Si no hay token, no realizamos la petición
    if (!token) {
      throw new Error('No token found');
    }

    // Configurar los headers con el token JWT
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Realizar la petición GET con los headers que incluyen el token
    return this.http.get<FacturaDTO[]>(`${this.url}/factura/listarFacturas`, { headers });
  }

    // Método para filtrar facturas por query string
    filtrarFacturas(query: string): Observable<FacturaDTO[]> {

      const token = this.getToken();

      // Si no hay token, no realizamos la petición
      if (!token) {
        throw new Error('No token found');
      }
  
      // Configurar los headers con el token JWT
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    // Realizamos la petición GET con los headers y el parámetro de búsqueda
    return this.http.get<FacturaDTO[]>(`${this.url}/factura/filtrar`, {
      headers,  // Añadir headers al request
      params: { query }  // Parámetro de búsqueda
    });
    }

}