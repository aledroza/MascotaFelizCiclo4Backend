import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Producto} from './producto.model';

@model({settings: {strict: false}})
export class Pedido extends Entity {
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
  id_producto: string;

  @property({
    type: 'string',
    required: true,
  })
  precio: number;

  @property({
    type: 'string',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'string',
    required: true,
  })
  fechaPedido: string;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @property({
    type: 'string',
    required: true,
  })
  observaciones: string;

  @property({
    type: 'string',
    required: true,
  })
  formaPago: string;

  @property({
    type: 'string',
    required: true,
  })
  formaEntrega: string;

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

  @belongsTo(() => Cliente)
  clienteId: string;

  @hasMany(() => Producto)
  productos: Producto[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Pedido>) {
    super(data);
  }
}

export interface PedidoRelations {
  // describe navigational properties here
}

export type PedidoWithRelations = Pedido & PedidoRelations;
