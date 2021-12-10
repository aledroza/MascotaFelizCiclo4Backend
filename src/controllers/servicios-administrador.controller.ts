import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Servicios,
  Administrador,
} from '../models';
import {ServiciosRepository} from '../repositories';

export class ServiciosAdministradorController {
  constructor(
    @repository(ServiciosRepository)
    public serviciosRepository: ServiciosRepository,
  ) { }

  @get('/servicios/{id}/administrador', {
    responses: {
      '200': {
        description: 'Administrador belonging to Servicios',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Administrador)},
          },
        },
      },
    },
  })
  async getAdministrador(
    @param.path.string('id') id: typeof Servicios.prototype.id,
  ): Promise<Administrador> {
    return this.serviciosRepository.administrador(id);
  }
}
