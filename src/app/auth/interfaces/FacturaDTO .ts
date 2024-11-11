import { DetalleFacturaDTO } from "./DetalleFacturaDTO ";

export interface FacturaDTO {
    id: number;
    fecha: Date;
    total: number;
    userId: number;
    username: String;
    detalles: DetalleFacturaDTO[];
  }
  