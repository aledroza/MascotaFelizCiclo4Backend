import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Asesor} from './asesor.model';

@model()
export class InformesB extends Entity {
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
  afiliaciones: string;

  @belongsTo(() => Asesor)
  asesorId: string;

  constructor(data?: Partial<InformesB>) {
    super(data);
  }
}

export interface InformesBRelations {
  // describe navigational properties here
}

export type InformesBWithRelations = InformesB & InformesBRelations;
