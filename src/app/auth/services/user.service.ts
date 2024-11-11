import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../interfaces';
import { DetailedUser } from '../interfaces/detailedUser ';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  private readonly url:string = environment.urlApi;

  // Método para obtener el token almacenado en el sessionStorage
  private getToken(): string | null {
    return sessionStorage.getItem('jwt');
  }

  // Método para obtener la lista de usuarios
  getUsers(): Observable<DetailedUser[]> {
    const token = this.getToken();

    // Si no hay token, no realizamos la petición
    if (!token) {
      throw new Error('No token found');
    }

    // Configurar los headers con el token JWT
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Realizar la petición GET con los headers que incluyen el token
    return this.http.get<DetailedUser[]>(`${this.url}/user/listUsuarios`, { headers });
  }
}
