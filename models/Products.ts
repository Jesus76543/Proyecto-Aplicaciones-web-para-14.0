import { Document, model, Schema } from 'mongoose';

export interface IProducto extends Document {
    nombre: string;
    descripcion: string;
    cantidad: number;
    precio: number;
}

const productoSchema = new Schema<IProducto>({
    nombre: { type: String, required: true },
    descripcion: { type: String },
    cantidad: { type: Number, required: true },
    precio: { type: Number, required: true }
});

export const Producto = model<IProducto>('Producto', productoSchema, 'productos');
