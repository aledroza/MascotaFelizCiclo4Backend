import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Solicitudes} from './solicitudes.model';

@model()
export class Afiliaciones extends Entity {
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
  nombreMascota: string;

  @property({
    type: 'string',
    required: true,
  })
  edadMascota: string;

  @property({
    type: 'string',
    required: true,
  })
  razaMascota: string;

  @property({
    type: 'string',
    required: true,
  })
  tipoMascota: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  cedula: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  plan: string;

  @property({
    type: 'string',
    required: true,
  })
  estadoSalud: string;

  @property({
    type: 'string',
    required: true,
  })
  foto: string;

  @property({
    type: 'string',
    required: true,
  })
  observaciones: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  @hasOne(() => Solicitudes)
  solicitudes: Solicitudes;

  constructor(data?: Partial<Afiliaciones>) {
    super(data);
  }
}

export interface AfiliacionesRelations {
  // describe navigational properties here
}

export type AfiliacionesWithRelations = Afiliaciones & AfiliacionesRelations;
