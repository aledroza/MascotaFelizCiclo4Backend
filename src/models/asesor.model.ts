import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Administrador} from './administrador.model';
import {InformesB} from './informes-b.model';
import {Solicitudes} from './solicitudes.model';
import {Plan} from './plan.model';
import {Producto} from './producto.model';

@model()
export class Asesor extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  cedula: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  contrasena: string;

  //agregado para el modulo asesores
  /******************************************************************** */
  @property({
    type: 'string',
    required: true,
  })
  cliente: string;
  /********************************************************************* */

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @belongsTo(() => Administrador)
  administradorId: string;

  @hasMany(() => InformesB)
  informesBS: InformesB[];

  @hasMany(() => Solicitudes)
  solicitudes: Solicitudes[];

  @hasMany(() => Plan)
  plans: Plan[];

  @hasMany(() => Producto)
  productos: Producto[];
  @property({
    type: 'string',
    required: true,
  })
  hash: string;


  constructor(data?: Partial<Asesor>) {
    super(data);
  }
}

export interface AsesorRelations {
  // describe navigational properties here
}

export type AsesorWithRelations = Asesor & AsesorRelations;
