import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';

@model()
export class Cuenta extends Entity {
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
  plan: string;

  @property({
    type: 'string',
    required: true,
  })
  mensualidad: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaCorte: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreMascota: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  constructor(data?: Partial<Cuenta>) {
    super(data);
  }
}

export interface CuentaRelations {
  // describe navigational properties here
}

export type CuentaWithRelations = Cuenta & CuentaRelations;
