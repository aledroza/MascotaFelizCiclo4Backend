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
  Cuenta,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteCuentaController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/cuenta', {
    responses: {
      '200': {
        description: 'Cliente has one Cuenta',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cuenta),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Cuenta>,
  ): Promise<Cuenta> {
    return this.clienteRepository.cuenta(id).get(filter);
  }

  @post('/clientes/{id}/cuenta', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cuenta)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cuenta, {
            title: 'NewCuentaInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) cuenta: Omit<Cuenta, 'id'>,
  ): Promise<Cuenta> {
    return this.clienteRepository.cuenta(id).create(cuenta);
  }

  @patch('/clientes/{id}/cuenta', {
    responses: {
      '200': {
        description: 'Cliente.Cuenta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cuenta, {partial: true}),
        },
      },
    })
    cuenta: Partial<Cuenta>,
    @param.query.object('where', getWhereSchemaFor(Cuenta)) where?: Where<Cuenta>,
  ): Promise<Count> {
    return this.clienteRepository.cuenta(id).patch(cuenta, where);
  }

  @del('/clientes/{id}/cuenta', {
    responses: {
      '200': {
        description: 'Cliente.Cuenta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Cuenta)) where?: Where<Cuenta>,
  ): Promise<Count> {
    return this.clienteRepository.cuenta(id).delete(where);
  }
}
