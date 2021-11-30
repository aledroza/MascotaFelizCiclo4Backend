import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cliente,
  Usuarios,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteUsuariosController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Usuarios belonging to Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuarios)},
          },
        },
      },
    },
  })
  async getUsuarios(
    @param.path.string('id') id: typeof Cliente.prototype.id,
  ): Promise<Usuarios> {
    return this.clienteRepository.usuarios(id);
  }
}
