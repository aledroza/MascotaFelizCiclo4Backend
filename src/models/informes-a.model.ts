import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Administrador} from './administrador.model';

@model()
export class InformesA extends Entity {
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
  solicitudes: string;

  @property({
    type: 'string',
    required: true,
  })
  asesores: string;

  @property({
    type: 'string',
    required: true,
  })
  productos: string;

  @property({
    type: 'string',
    required: true,
  })
  planes: string;

  @belongsTo(() => Administrador)
  administradorId: string;

  constructor(data?: Partial<InformesA>) {
    super(data);
  }
}

export interface InformesARelations {
  // describe navigational properties here
}

export type InformesAWithRelations = InformesA & InformesARelations;
