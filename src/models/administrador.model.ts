import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Usuarios} from './usuarios.model';
import {Asesor} from './asesor.model';
import {Solicitudes} from './solicitudes.model';
import {Producto} from './producto.model';
import {Plan} from './plan.model';
import {Servicios} from './servicios.model';
import {InformesA} from './informes-a.model';

@model()
export class Administrador extends Entity {
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
  asesor: string;

  @property({
    type: 'string',
    required: true,
  })
  planes: string;
  @property({
    type: 'string',
    required: true,
  })
  informes: string;

  @belongsTo(() => Usuarios)
  usuariosId: string;

  @hasMany(() => Asesor)
  asesors: Asesor[];

  @hasMany(() => Solicitudes)
  solicitudes: Solicitudes[];

  @hasMany(() => Producto)
  productos: Producto[];

  @hasMany(() => Plan)
  plans: Plan[];

  @hasMany(() => Servicios)
  servicios: Servicios[];

  @hasMany(() => InformesA)
  informesAS: InformesA[];

  constructor(data?: Partial<Administrador>) {
    super(data);
  }
}

export interface AdministradorRelations {
  // describe navigational properties here
}

export type AdministradorWithRelations = Administrador & AdministradorRelations;
