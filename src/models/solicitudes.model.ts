import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Afiliaciones} from './afiliaciones.model';

@model()
export class Solicitudes extends Entity {
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
  cedula: string;

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
  tipoMascota: string;

  @property({
    type: 'string',
    required: true,
  })
  estadoSalud: string;

  @property({
    type: 'string',
    required: true,
  })
  fechaSolicitud: string;

  @property({
    type: 'string',
    required: true,
  })
  estadoSolicitud: string;

  @property({
    type: 'string',
    required: true,
  })
  foto: string;

  @property({
    type: 'string',
    required: true,
  })
  detalles: string;

  @property({
    type: 'string',
    required: true,
  })
  contrato: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  @belongsTo(() => Afiliaciones)
  afiliacionesId: string;

  constructor(data?: Partial<Solicitudes>) {
    super(data);
  }
}

export interface SolicitudesRelations {
  // describe navigational properties here
}

export type SolicitudesWithRelations = Solicitudes & SolicitudesRelations;
