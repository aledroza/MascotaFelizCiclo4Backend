import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {HistoriaClinica} from './historia-clinica.model';
import {Plan} from './plan.model';

@model()
export class Mascota extends Entity {
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
  razaMascota: string;
  @property({
    type: 'string',
    required: true,
  })
  id_plan: string;

  @property({
    type: 'string',
    required: true,
  })
  cuenta: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  @hasOne(() => HistoriaClinica)
  historiaClinica: HistoriaClinica;

  @hasOne(() => Plan)
  plan: Plan;

  constructor(data?: Partial<Mascota>) {
    super(data);
  }
}

export interface MascotaRelations {
  // describe navigational properties here
}

export type MascotaWithRelations = Mascota & MascotaRelations;
