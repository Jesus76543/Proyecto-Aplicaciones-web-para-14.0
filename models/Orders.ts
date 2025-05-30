import { Document, model, Schema, Types } from 'mongoose';

export interface IOrden extends Document {
    fechaCreacion: Date;
    usuarioCreador: Types.ObjectId; // referencia al modelo User
    total: number;
    subtotal: number;
}

const ordenSchema = new Schema<IOrden>({
    fechaCreacion: { type: Date, default: Date.now },
    usuarioCreador: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    total: { type: Number, required: true },
    subtotal: { type: Number, required: true }
});

export const Orden = model<IOrden>('Orden', ordenSchema, 'ordenes');
