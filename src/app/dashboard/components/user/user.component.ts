

import { UserService } from '../../../auth/services/user.service';


import { Component, OnInit } from '@angular/core';

import { Table, TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TagModule } from 'primeng/tag';
import { DetailedUser } from '../../../auth/interfaces/detailedUser ';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [TableModule, HttpClientModule, InputTextModule, TagModule, IconFieldModule, InputIconModule,CommonModule, ButtonModule, FormsModule,DropdownModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent {


  users: DetailedUser[] = [];
 
  selectedUserRole: string | null = null;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
    
  }

  // Método para cargar la lista de usuarios
  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data: DetailedUser[]) => {
        this.users = data;
       // console.log(this.users);
      },
      error: (err) => {
        console.error('Error al cargar usuarios', err);
      }
    });
  }

  editUser(user: DetailedUser): void {
    // Lógica para editar usuario
    console.log('Edit user:', user);
  }

  deleteUser(user: DetailedUser): void {
    // Lógica para eliminar usuario
    console.log('Delete user:', user);
  }

  generateReport(user: DetailedUser): void {
    // Lógica para generar reporte
    console.log('Generate report for user:', user);
  }


}
