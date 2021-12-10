import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Administrador} from './administrador.model';
import {Asesor} from './asesor.model';

@model()
export class Producto extends Entity {
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
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;
  /*****************************modulo Administrador****************** */
  @property({
    type: 'string',
    required: true,
  })
  proveedor: string;

  @property({
    type: 'string',
    required: true,
  })
  departamento: string;
  /******************************************************************* */
  /*****************************Modulo Asesor************************************** */
  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;
  /******************************************************************************** */

  @property({
    type: 'string',
    required: true,
  })
  precio: string;

  @property({
    type: 'string',
  })
  pedidoId?: string;

  @belongsTo(() => Administrador)
  administradorId: string;

  @belongsTo(() => Asesor)
  asesorId: string;

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
