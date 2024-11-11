
export class  ProductoDTO {
    id: number;
    nombre: string;
    descripcion: string;
    precioUnitario: number;
    urlimagen: string;
    stock: number;
    estado: boolean;
  
    constructor(
      id: number = 0,
      nombre: string = '',
      descripcion: string = '',
      precioUnitario: number = 0,
      urlimagen: string = '',
      stock: number = 0,
      estado: boolean = true
    ) {
      this.id = id;
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.precioUnitario = precioUnitario;
      this.urlimagen = urlimagen;
      this.stock = stock;
      this.estado = estado;
    }
  }
  