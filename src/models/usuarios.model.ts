import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {Registro} from './registro.model';
import {Ingreso} from './ingreso.model';
import {Cliente} from './cliente.model';
import {Administrador} from './administrador.model';

@model()
export class Usuarios extends Entity {
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
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

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
  rol: string;

  @property({
    type: 'string',
    required: false,
  })
  autenticacion: string;

  @property({
    type: 'string',
    required: false,
  })
  clave: string;

  @hasOne(() => Registro)
  registro: Registro;

  @hasMany(() => Ingreso)
  ingresos: Ingreso[];

  @hasMany(() => Cliente)
  clientes: Cliente[];

  @hasMany(() => Administrador)
  administradors: Administrador[];

  constructor(data?: Partial<Usuarios>) {
    super(data);
  }
}

export interface UsuariosRelations {
  // describe navigational properties here
}

export type UsuariosWithRelations = Usuarios & UsuariosRelations;
