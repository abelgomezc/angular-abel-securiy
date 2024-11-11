import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar ReactiveFormsModule correctamente
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import { RippleModule } from 'primeng/ripple';

import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FileUploadModule } from 'primeng/fileupload';

import { FileUploadEvent } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { ref, Storage, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { ProductoService } from '../../../services/producto.service';
import { ProductoDTO } from '../../../interfaces/ProductoDTO';
import { catchError, of } from 'rxjs';



@Component({
  selector: 'app-registro-producto',
  standalone: true,
  imports: [
    CommonModule, // Usamos CommonModule para obtener las directivas de Angular
    InputTextModule,
    DropdownModule,
    InputTextareaModule,
    RippleModule,
    ProgressSpinnerModule,
    TableModule,
    ButtonModule,
    CardModule,
    FormsModule,
    FloatLabelModule,
    InputNumberModule,
    FileUploadModule,

    ReactiveFormsModule, // Asegúrate de importar correctamente ReactiveFormsModule
  ],
  templateUrl: './registro-producto.component.html',
  styleUrls: ['./registro-producto.component.css'],
})
export class RegistroProductoComponent {
 // productForm: FormGroup;
  // file!: File;
  // previewUrl: string | null = null;
  // loading: boolean = false;

  //  producto = new ProductoDTO();

  // private readonly _storage = inject(Storage);

  // constructor( private productoService: ProductoService){


  // }

  // constructor(private fb: FormBuilder, private productoService: ProductoService) {
  //   this.productForm = this.fb.group({
  //     nombre: ['', Validators.required],
  //     descripcion: ['', Validators.required],
  //   });
  // }

  // // Manejo de la selección de archivo
  // onFileSelected(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files) {
  //     this.file = input.files[0];

  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.previewUrl = reader.result as string;
  //     };
  //     reader.readAsDataURL(this.file);
  //   }
  // }

  // // Función para manejar el submit del formulario
  // async onSubmit() {
  //   if (this.productForm.valid && this.file) {
  //     this.loading = true;

  //     const storageRef = ref(this._storage, `uploads/${this.file.name}`);
  //     const uploadTask = uploadBytesResumable(storageRef, this.file);

  //     try {
  //       await new Promise<void>((resolve, reject) => {
  //         uploadTask.on(
  //           'state_changed',
  //           (snapshot) => {
  //             // Opcional: manejar el progreso aquí
  //           },
  //           (error) => {
  //             reject(error);
  //           },
  //           async () => {
  //             try {
  //               const downloadURL = await getDownloadURL(storageRef);
  //               console.log('URL de la imagen:', downloadURL);

  //               const formData = {
  //                 ...this.productForm.value,
  //                 imagenUrl: downloadURL,
  //               };

  //               await this.saveFormData(formData);

  //               resolve();
  //             } catch (error) {
  //               reject(error);
  //             }
  //           }
  //         );
  //       });
  //     } catch (error) {
  //       console.error('Error durante el proceso de carga:', error);
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Error',
  //         text: 'Error al subir la imagen o guardar los datos.',
  //       });
  //     } finally {
  //       this.loading = false;
  //     }
  //   } else {
  //     Swal.fire({
  //       icon: 'warning',
  //       title: 'Formulario incompleto',
  //       text: 'Por favor, complete todos los campos.',
  //     });
  //   }
  // }

  // async saveFormData(data: any) {
  //   console.log('Datos del formulario con URL de imagen:', data);
  //   Swal.fire({
  //     icon: 'success',
  //     title: 'Éxito',
  //     text: 'Producto registrado correctamente.',
  //   });
  // }

  // uploadedFile: string | null = null;  // Aquí guardamos la URL de la imagen subida

  // // Manejar la carga de la imagen
  // onImageUpload(event: any) {
  //   if (event.files && event.files.length > 0) {
  //     const file = event.files[0];
  //     const reader = new FileReader();
  //     // Leemos la imagen y la mostramos en el formulario
  //     reader.onload = (e: any) => {
  //       this.uploadedFile = e.target.result;
  //     };
  //     reader.readAsDataURL(file);  // Convertimos la imagen a base64
  //   }
  // }


// ProductoDTO es tu clase para el producto
producto = new ProductoDTO();
uploadedFilePath: string | null = null;  // Guardamos solo la URL de la imagen
loading: boolean = false;
 file!: File;
 selectedFile: File | null = null;
 siguienteId: number = 0;
 error: string | null = null;  // Para manejar errores

private readonly _storage = inject(Storage);

constructor(private productoService: ProductoService) {}


// Método para obtener el siguiente ID de forma asíncrona
async obtenerSiguienteIdAsync(): Promise<void> {
  try {
    this.siguienteId = await new Promise<number>((resolve, reject) => {
      this.productoService.obtenerSiguienteId().subscribe({
        next: (id: number) => {
          this.siguienteId = id;
          console.log('Siguiente ID:', this.siguienteId);  // Ver en consola si se obtuvo correctamente
          resolve(id);  // Resolvemos la promesa con el ID
        },
        error: (err) => {
          this.error = err;
          console.error('Error al obtener el siguiente ID:', err);
          reject(err);  // En caso de error, rechazamos la promesa
        }
      });
    });
  } catch (err) {
    console.error('Error en la obtención del siguiente ID:', err);
    throw err;
  }
}



onImageUpload(): Promise<string | null> {
 
  return new Promise(async (resolve, reject) => {
    if (!this.selectedFile) {  // Asegúrate de que hay un archivo seleccionado
      resolve(null);  // Si no hay archivo, no hacemos nada
      return;
    }
 
    const file = this.selectedFile;  // Archivo seleccionado previamente

    // Asegúrate de que 'this.siguienteId' tiene el valor correcto antes de subir la imagen
    const fileExtension = file.name.split('.').pop();  // Obtener la extensión del archivo
    const fileName = `imgproducto${this.siguienteId}.${fileExtension}`;  // Formato: imgproducto<ID>.<extensión>

    const storageRef = ref(this._storage, `productos/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Subir el archivo
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Aquí podrías agregar progreso de carga si lo deseas
      },
      (error) => {
        console.error('Error al subir la imagen', error);
        reject(error);  // En caso de error, rechazamos la promesa
      },
      () => {
        // Cuando la carga se haya completado con éxito, obtenemos la URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('Archivo subido con éxito. URL:', downloadURL);
          resolve(downloadURL);  // Resolvemos la promesa con la URL
        });
      }
    );
  });
}


// Función para crear el producto
  async crearProducto(): Promise<void> {
  await this.obtenerSiguienteIdAsync();
  // Primero llamamos a `onImageUpload` para subir la imagen
  this.onImageUpload().then((imageUrl) => {
    if (!imageUrl) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, cargue una imagen del producto.',
      });
      return;
    }

    // Ahora que tenemos la URL de la imagen, podemos proceder a crear el producto
    this.producto.urlimagen = imageUrl;  // Usamos la URL de la imagen

    // Establecer el estado de carga
    this.loading = true;
    console.log(this.producto);

    // Llamar al servicio para crear el producto
    this.productoService.newProducto(this.producto).subscribe({
      next: (productoCreado) => {
        console.log('Producto creado exitosamente', productoCreado);
        this.loading = false;

        Swal.fire({
          icon: 'success',
          title: 'Producto Creado',
          text: 'El producto se ha creado correctamente.',
        });

        // Limpiar el formulario
        this.producto = new ProductoDTO();
        this.uploadedFilePath = null;  // Limpiar la ruta de la imagen
        this.siguienteId = 0;
      },
      error: (err) => {
        console.error('Error al crear producto', err);
        this.loading = false;

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al crear el producto. Intenta nuevamente.',
        });
      },
    });
  }).catch((error) => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un error al cargar la imagen. Intenta nuevamente.',
    });
  });
}



 
}

