import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Cliente,
  Afiliaciones,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteAfiliacionesController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/afiliaciones', {
    responses: {
      '200': {
        description: 'Array of Cliente has many Afiliaciones',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Afiliaciones)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Afiliaciones>,
  ): Promise<Afiliaciones[]> {
    return this.clienteRepository.afiliaciones(id).find(filter);
  }

  @post('/clientes/{id}/afiliaciones', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Afiliaciones)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Afiliaciones, {
            title: 'NewAfiliacionesInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) afiliaciones: Omit<Afiliaciones, 'id'>,
  ): Promise<Afiliaciones> {
    return this.clienteRepository.afiliaciones(id).create(afiliaciones);
  }

  @patch('/clientes/{id}/afiliaciones', {
    responses: {
      '200': {
        description: 'Cliente.Afiliaciones PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Afiliaciones, {partial: true}),
        },
      },
    })
    afiliaciones: Partial<Afiliaciones>,
    @param.query.object('where', getWhereSchemaFor(Afiliaciones)) where?: Where<Afiliaciones>,
  ): Promise<Count> {
    return this.clienteRepository.afiliaciones(id).patch(afiliaciones, where);
  }

  @del('/clientes/{id}/afiliaciones', {
    responses: {
      '200': {
        description: 'Cliente.Afiliaciones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Afiliaciones)) where?: Where<Afiliaciones>,
  ): Promise<Count> {
    return this.clienteRepository.afiliaciones(id).delete(where);
  }
}
