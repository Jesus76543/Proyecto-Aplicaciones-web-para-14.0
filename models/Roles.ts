import { Document, model, Schema } from 'mongoose';

export interface IRol extends Document {
    idRol: string;
    tipo: string;
}

const rolSchema = new Schema<IRol>({
    idRol: { type: String, required: true, unique: true },
    tipo: { type: String, required: true }
});

export const Rol = model<IRol>('Rol', rolSchema, 'roles');
