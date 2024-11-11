

import { Component, inject } from '@angular/core';
import { FacturaDTO } from '../../../auth/interfaces/FacturaDTO ';
import { FacturaService } from '../../../auth/services/facturas.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { ProductoDTO } from '../../../interfaces/ProductoDTO';
import { ProductoService } from '../../../services/producto.service';



@Component({
  selector: 'app-listado-productos',
  standalone: true,
  imports: [HttpClientModule,CommonModule, TableModule,InputTextModule, 
    TagModule,DropdownModule,MultiSelectModule,ProgressBarModule,ButtonModule ,FormsModule ,RouterModule],
  templateUrl: './listado-productos.component.html',
  styleUrl: './listado-productos.component.css'
})
export class ListadoProductosComponent {

  private router = inject(Router);


  irANuevoProducto() {
    this.router.navigate(['/dashboard/registro-producto']); // Navega al componente NuevoFactura
  }



  
  // facturas: FacturaDTO[] = [];
  productos : ProductoDTO[] = [];


  filteredProductos : ProductoDTO[] = [];
  // filteredFacturas: FacturaDTO[] = []; 

  private searchSubject: Subject<string> = new Subject<string>();

  constructor(private productoService: ProductoService) { }
  loading: boolean = true;
  // private router = inject(Router);
  searchValue: string = '';

  ngOnInit(): void {
    this.loadProductos();

     // Debounce de las búsquedas
     this.searchSubject.pipe(debounceTime(300)).subscribe((query) => {
     // this.filtrarFacturas(query);  // Realiza la búsqueda después de 300ms de inactividad
    });
  }

  onSearchChange(): void {
    this.searchSubject.next(this.searchValue);  // Emitimos el valor actual del input
  }

  loadProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (data: ProductoDTO[]) => {
        this.productos = data;
        this.filteredProductos = data; // Inicialmente mostrar todas las facturas
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar Productos', err);
        this.loading = false;
      }
    });
  }

  clear(dt: any) {
    dt.clear();
     this.searchValue = ''
  }





    // filtrarFacturas(query: string): void {
    //   if (query) {
    //     this.loading = true;
    //     this.productoService.filtrarFacturas(query).subscribe({
    //       next: (data: FacturaDTO[]) => {
    //         this.facturas = data;  // Actualizamos la lista con las facturas filtradas
    //         this.loading = false;
    //       },
    //       error: (err) => {
    //         console.error('Error al filtrar facturas', err);
    //         this.loading = false;
    //       }
    //     });
    //   } else {
    //     // Si el campo de búsqueda está vacío, cargamos todas las facturas de nuevo
    //     this.loadFacturas();
    //   }
    // }


    verFactura(factura: FacturaDTO): void {
      // Aquí puedes implementar la lógica para mostrar un modal con detalles
      console.log('Ver factura', factura);
    }
  

    // Función para descargar la factura
    descargarFactura(factura: FacturaDTO): void {
      // Aquí puedes implementar la lógica para descargar la factura (por ejemplo, en formato PDF)
      console.log('Descargar factura', factura);
    }


}
