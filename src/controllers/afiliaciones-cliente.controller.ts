import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Afiliaciones,
  Cliente,
} from '../models';
import {AfiliacionesRepository} from '../repositories';

export class AfiliacionesClienteController {
  constructor(
    @repository(AfiliacionesRepository)
    public afiliacionesRepository: AfiliacionesRepository,
  ) { }

  @get('/afiliaciones/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Afiliaciones',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.string('id') id: typeof Afiliaciones.prototype.id,
  ): Promise<Cliente> {
    return this.afiliacionesRepository.cliente(id);
  }
}
