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
  Administrador,
  Servicios,
} from '../models';
import {AdministradorRepository} from '../repositories';

export class AdministradorServiciosController {
  constructor(
    @repository(AdministradorRepository) protected administradorRepository: AdministradorRepository,
  ) { }

  @get('/administradors/{id}/servicios', {
    responses: {
      '200': {
        description: 'Array of Administrador has many Servicios',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Servicios)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Servicios>,
  ): Promise<Servicios[]> {
    return this.administradorRepository.servicios(id).find(filter);
  }

  @post('/administradors/{id}/servicios', {
    responses: {
      '200': {
        description: 'Administrador model instance',
        content: {'application/json': {schema: getModelSchemaRef(Servicios)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Administrador.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicios, {
            title: 'NewServiciosInAdministrador',
            exclude: ['id'],
            optional: ['administradorId']
          }),
        },
      },
    }) servicios: Omit<Servicios, 'id'>,
  ): Promise<Servicios> {
    return this.administradorRepository.servicios(id).create(servicios);
  }

  @patch('/administradors/{id}/servicios', {
    responses: {
      '200': {
        description: 'Administrador.Servicios PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicios, {partial: true}),
        },
      },
    })
    servicios: Partial<Servicios>,
    @param.query.object('where', getWhereSchemaFor(Servicios)) where?: Where<Servicios>,
  ): Promise<Count> {
    return this.administradorRepository.servicios(id).patch(servicios, where);
  }

  @del('/administradors/{id}/servicios', {
    responses: {
      '200': {
        description: 'Administrador.Servicios DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Servicios)) where?: Where<Servicios>,
  ): Promise<Count> {
    return this.administradorRepository.servicios(id).delete(where);
  }
}
