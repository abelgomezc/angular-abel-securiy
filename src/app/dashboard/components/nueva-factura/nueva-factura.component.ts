import { Component, inject, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage'; 
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nueva-factura',
  standalone: true,
  imports: [InputTextModule,DropdownModule,InputTextareaModule,TableModule, CommonModule],
  templateUrl: './nueva-factura.component.html',
  styleUrl: './nueva-factura.component.css'
})
export class NuevaFacturaComponent {

  progress = signal('0%');

  file!: File;

  private readonly _storage = inject(Storage);

  susbscription: Subscription | undefined = undefined;

  changeInput(event: Event) {
    console.log(this._storage);
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.file = input.files[0];
      this.uploadFile();
    }

   
  }
  uploadFile() {
    const storageRef = ref(this._storage, `uploads/${this.file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, this.file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, 
      (error) => {
        console.error('Error uploading file:', error);
      }, 
      async () => {
        // Obtener URL de descarga cuando la carga es exitosa
        const downloadURL = await getDownloadURL(storageRef);
        console.log('File uploaded successfully. Download URL:', downloadURL);

        // Aquí puedes llamar a una función para guardar la URL en la base de datos
       // this.saveFileUrl(downloadURL);
      }
    );
  }
 


}
