import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { ProductoDTO } from '../interfaces/ProductoDTO';
import { catchError, Observable, of, throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductoService {


    private http = inject(HttpClient);
    private readonly url:string = environment.urlApi;
  
    // Método para obtener el token almacenado en el sessionStorage
    private getToken(): string | null {
      return sessionStorage.getItem('jwt');



    }

  getProductos(): Observable<ProductoDTO[]> {
    const token = this.getToken();

    // Si no hay token, no realizamos la petición
    if (!token) {
      throw new Error('No token found');
    }

    // Configurar los headers con el token JWT
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Realizar la petición GET con los headers que incluyen el token
    return this.http.get<ProductoDTO[]>(`${this.url}/producto/listarProductos`, { headers });
  }

    // Método para crear un nuevo producto (POST)
    newProducto(producto: ProductoDTO): Observable<ProductoDTO> {
      const token = this.getToken();
  
      if (!token) {
        throw new Error('No token found');
      }
  
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json');
      
      // Realizar la petición POST con los headers y el cuerpo del producto
      return this.http.post<ProductoDTO>(`${this.url}/producto/nuevoProducto`, producto, { headers });
    }

    obtenerSiguienteId(): Observable<number> {
      const token = this.getToken();
    
      if (!token) {
        return throwError('No token found');  // Si no hay token, lanza un error
      }
    
      const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json');
    
      return this.http.get<number>(`${this.url}/producto/siguienteIDProducto`, { headers }).pipe(
        catchError(error => {
          console.error('Error al obtener el siguiente ID:', error);
          return of(0);  // Devuelve un 0 en caso de error
        })
      );
    }
    
    


}