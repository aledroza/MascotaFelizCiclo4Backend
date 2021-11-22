import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Ingreso,
  Usuarios,
} from '../models';
import {IngresoRepository} from '../repositories';

export class IngresoUsuariosController {
  constructor(
    @repository(IngresoRepository)
    public ingresoRepository: IngresoRepository,
  ) { }

  @get('/ingresos/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Usuarios belonging to Ingreso',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuarios)},
          },
        },
      },
    },
  })
  async getUsuarios(
    @param.path.string('id') id: typeof Ingreso.prototype.id,
  ): Promise<Usuarios> {
    return this.ingresoRepository.usuarios(id);
  }
}
