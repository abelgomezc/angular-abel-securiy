import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '../interfaces/authResponse';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { LoginResponse , UserResponse, User, RegisteredUser} from '../interfaces';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'; // camando para instalar: npm install @auth0/angular-jwt
import jwt_decode from "jwt-decode";//npm install jwt-decode , npm install --save-dev @types/jwt-decode


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private roles: string[] = [];

  private http = inject(HttpClient);
  private readonly url:string = environment.urlApi;
  private router = inject(Router);

  private _authStatus = signal<AuthStatus>(AuthStatus.checking);
  public authStatus  = computed(() => this._authStatus());

  private _currentAuthUser = signal<AuthResponse|null>(null);
  public currentAuthUser   = computed(() => this._currentAuthUser());

  private _currentUserToken = signal<String|null>(null);
  public currentUserToken  = computed(() => this._currentUserToken());

  private _currentRegisteredUser = signal<RegisteredUser|null>(null);
  public currentRegisteredUser = computed(() => this._currentRegisteredUser());

  private jwtHelper = new JwtHelperService();
  constructor() {
    this.isLogged().subscribe();
  }
  

  private extractRolesFromToken(token: string) {
    const decodedToken = this.jwtHelper.decodeToken(token);
    this.roles = decodedToken.authorities.map((auth: { authority: string }) => auth.authority);
  }
  


  
  login(credentials: LoginResponse):Observable<boolean>{
    return this.http.post<User>(this.url+ '/login',credentials).pipe(

      tap((user: User) => {
        sessionStorage.setItem("jwt",user.jwt);
        this._currentUserToken.set(user.jwt);
        this._authStatus.set(AuthStatus.authenticated);
        this.extractRolesFromToken(user.jwt);
     
        
      }),
      map(() => true),
      catchError((error)=> {
        this._authStatus.set(AuthStatus.notAuthenticated);
        return this.handleError(error);
      })

    )
  }

  isLogged(): Observable<boolean> {
    const jwt = sessionStorage.getItem("jwt");

    if(!jwt){
      this._authStatus.set(AuthStatus.notAuthenticated);
      return of(false);
    }else{
      this._authStatus.set(AuthStatus.authenticated);
    }
    this.extractRolesFromToken(jwt);

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + jwt);

    return this.http.post<AuthResponse>(environment.urlApi + "/profile", {}, {headers}).pipe(
      tap((user: AuthResponse) => {
        console.log("service")
        console.log(user);
        this._currentAuthUser.set(user);
        this._authStatus.set(AuthStatus.authenticated);
      }),
      map( () => true),
      catchError((error) => {
        this._authStatus.set(AuthStatus.notAuthenticated);
        return this.handleError(error);
      })
    );

  }

  getRoles(): string[] {
    return this.roles;
  }

  registerUsers(credentials: UserResponse):Observable<boolean>{
    return this.http.post<RegisteredUser>(environment.urlApi + '/user/registereUser',credentials).pipe(
      tap((user: RegisteredUser) => {
        sessionStorage.setItem("jwt",user.token);
        this._currentRegisteredUser.set(user);
        this._authStatus.set(AuthStatus.authenticated);
      }),
      map(() => true),
      catchError((error)=>{
        this._authStatus.set(AuthStatus.notAuthenticated);
        return this.handleError(error)
      })
    )
  }

  private handleError(error: HttpErrorResponse){
    if(error.status === 0){
      console.error('Ha ocurrido un error', error.error);
    }else{
      console.error(`Backend regreso codigo ${error.status}, el cuerpo fue: ${error.error}`);
    }
    return throwError(() => new Error('Por favor intenta de nuevo'));
  }

  // public async logout() {
  //   const result = await Swal.fire({
  //     title: '¿Desea cerrar sesión?',
  //     showDenyButton: true,
  //     confirmButtonText: `Si`,
  //     denyButtonText: `No`,
  //   });

  //   if (result.isConfirmed) {
  //     this._authStatus.set(AuthStatus.notAuthenticated);
  //     this._currentAuthUser.set(null);
  //     console.log('logout' + this._authStatus());
  //     sessionStorage.removeItem('jwt');
  //     this.router.navigateByUrl('/login');
  //   }
  // }

  public async logout() {
    const result = await Swal.fire({
      title: '¿Desea cerrar sesión?',
      showDenyButton: true,
      confirmButtonText: `Sí`,
      denyButtonText: `No`,
    });
  
    if (result.isConfirmed) {
      this._authStatus.set(AuthStatus.notAuthenticated);
      this._currentAuthUser.set(null);
      console.log('logout: ' + this._authStatus());
      sessionStorage.removeItem('jwt');
      
      // Redirigir a la página de login y recargar
      this.router.navigateByUrl('/login').then(() => {
        window.location.reload(); // Recargar la página
      });
    }
  }
  

}









  


