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
  InformesA,
} from '../models';
import {AdministradorRepository} from '../repositories';

export class AdministradorInformesAController {
  constructor(
    @repository(AdministradorRepository) protected administradorRepository: AdministradorRepository,
  ) { }

  @get('/administradors/{id}/informes-as', {
    responses: {
      '200': {
        description: 'Array of Administrador has many InformesA',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(InformesA)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<InformesA>,
  ): Promise<InformesA[]> {
    return this.administradorRepository.informesAS(id).find(filter);
  }

  @post('/administradors/{id}/informes-as', {
    responses: {
      '200': {
        description: 'Administrador model instance',
        content: {'application/json': {schema: getModelSchemaRef(InformesA)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Administrador.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InformesA, {
            title: 'NewInformesAInAdministrador',
            exclude: ['id'],
            optional: ['administradorId']
          }),
        },
      },
    }) informesA: Omit<InformesA, 'id'>,
  ): Promise<InformesA> {
    return this.administradorRepository.informesAS(id).create(informesA);
  }

  @patch('/administradors/{id}/informes-as', {
    responses: {
      '200': {
        description: 'Administrador.InformesA PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InformesA, {partial: true}),
        },
      },
    })
    informesA: Partial<InformesA>,
    @param.query.object('where', getWhereSchemaFor(InformesA)) where?: Where<InformesA>,
  ): Promise<Count> {
    return this.administradorRepository.informesAS(id).patch(informesA, where);
  }

  @del('/administradors/{id}/informes-as', {
    responses: {
      '200': {
        description: 'Administrador.InformesA DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(InformesA)) where?: Where<InformesA>,
  ): Promise<Count> {
    return this.administradorRepository.informesAS(id).delete(where);
  }
}
