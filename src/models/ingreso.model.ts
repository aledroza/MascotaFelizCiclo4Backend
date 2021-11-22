import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Usuarios} from './usuarios.model';

@model()
export class Ingreso extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @property({
    type: 'string',
    required: true,
  })
  rol: string;

  @property({
    type: 'string',
    required: true,
  })
  catchat: string;

  @belongsTo(() => Usuarios)
  usuariosId: string;

  constructor(data?: Partial<Ingreso>) {
    super(data);
  }
}

export interface IngresoRelations {
  // describe navigational properties here
}

export type IngresoWithRelations = Ingreso & IngresoRelations;
