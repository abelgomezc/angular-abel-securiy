import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { routes } from '../../app.routes';
import { AuthResponse } from '../../auth/interfaces';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SweetAlert2Module, HttpClientModule, RouterOutlet, RouterModule],
  providers: [AuthService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  implements OnInit{
  private  authService = inject(AuthService);
  private router = inject(Router);
  //userRole: string = '';
  public currentAuthUser: AuthResponse | null = null;

 

  constructor() {
    this.roles = this.authService.getRoles();

    
  }

  ngOnInit() {
    this.authService.isLogged().subscribe(isLoggedIn => {
        if (isLoggedIn) {
          
            this.currentAuthUser = this.authService.currentAuthUser(); // Accediendo al computed
            console.log("Usuario autenticado: ", this.currentAuthUser);
        } else {
            console.log("No autenticado");
        }
    });
}

  
  roles: string[] = [];
  onLogout() {
    this.authService.logout();
    //this.router.navigateByUrl('/login');
  }

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }

}
