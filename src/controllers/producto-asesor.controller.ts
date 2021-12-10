import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Producto,
  Asesor,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoAsesorController {
  constructor(
    @repository(ProductoRepository)
    public productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/asesor', {
    responses: {
      '200': {
        description: 'Asesor belonging to Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Asesor)},
          },
        },
      },
    },
  })
  async getAsesor(
    @param.path.string('id') id: typeof Producto.prototype.id,
  ): Promise<Asesor> {
    return this.productoRepository.asesor(id);
  }
}
