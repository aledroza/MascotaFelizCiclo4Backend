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
  HistoriaClinica,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteHistoriaClinicaController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/historia-clinicas', {
    responses: {
      '200': {
        description: 'Array of Cliente has many HistoriaClinica',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(HistoriaClinica)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<HistoriaClinica>,
  ): Promise<HistoriaClinica[]> {
    return this.clienteRepository.historiaClinicas(id).find(filter);
  }

  @post('/clientes/{id}/historia-clinicas', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(HistoriaClinica)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HistoriaClinica, {
            title: 'NewHistoriaClinicaInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) historiaClinica: Omit<HistoriaClinica, 'id'>,
  ): Promise<HistoriaClinica> {
    return this.clienteRepository.historiaClinicas(id).create(historiaClinica);
  }

  @patch('/clientes/{id}/historia-clinicas', {
    responses: {
      '200': {
        description: 'Cliente.HistoriaClinica PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HistoriaClinica, {partial: true}),
        },
      },
    })
    historiaClinica: Partial<HistoriaClinica>,
    @param.query.object('where', getWhereSchemaFor(HistoriaClinica)) where?: Where<HistoriaClinica>,
  ): Promise<Count> {
    return this.clienteRepository.historiaClinicas(id).patch(historiaClinica, where);
  }

  @del('/clientes/{id}/historia-clinicas', {
    responses: {
      '200': {
        description: 'Cliente.HistoriaClinica DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(HistoriaClinica)) where?: Where<HistoriaClinica>,
  ): Promise<Count> {
    return this.clienteRepository.historiaClinicas(id).delete(where);
  }
}
