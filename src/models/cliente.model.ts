import {Entity, model, property, belongsTo, hasMany, hasOne} from '@loopback/repository';
import {Usuarios} from './usuarios.model';
import {Afiliaciones} from './afiliaciones.model';
import {Solicitudes} from './solicitudes.model';
import {Pedido} from './pedido.model';
import {Mascota} from './mascota.model';
import {Cuenta} from './cuenta.model';
import {HistoriaClinica} from './historia-clinica.model';

@model()
export class Cliente extends Entity {
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
  pedido: string;
  @property({
    type: 'string',
    required: true,
  })
  historiaClinica: string;
  @belongsTo(() => Usuarios)
  usuariosId: string;

  @hasMany(() => Afiliaciones)
  afiliaciones: Afiliaciones[];

  @hasMany(() => Solicitudes)
  solicitudes: Solicitudes[];

  @hasMany(() => Pedido)
  pedidos: Pedido[];

  @hasMany(() => Mascota)
  mascotas: Mascota[];

  @hasOne(() => Cuenta)
  cuenta: Cuenta;

  @hasMany(() => HistoriaClinica)
  historiaClinicas: HistoriaClinica[];

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
