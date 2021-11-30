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
  Afiliaciones,
  Solicitudes,
} from '../models';
import {AfiliacionesRepository} from '../repositories';

export class AfiliacionesSolicitudesController {
  constructor(
    @repository(AfiliacionesRepository) protected afiliacionesRepository: AfiliacionesRepository,
  ) { }

  @get('/afiliaciones/{id}/solicitudes', {
    responses: {
      '200': {
        description: 'Afiliaciones has one Solicitudes',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Solicitudes),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Solicitudes>,
  ): Promise<Solicitudes> {
    return this.afiliacionesRepository.solicitudes(id).get(filter);
  }

  @post('/afiliaciones/{id}/solicitudes', {
    responses: {
      '200': {
        description: 'Afiliaciones model instance',
        content: {'application/json': {schema: getModelSchemaRef(Solicitudes)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Afiliaciones.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitudes, {
            title: 'NewSolicitudesInAfiliaciones',
            exclude: ['id'],
            optional: ['afiliacionesId']
          }),
        },
      },
    }) solicitudes: Omit<Solicitudes, 'id'>,
  ): Promise<Solicitudes> {
    return this.afiliacionesRepository.solicitudes(id).create(solicitudes);
  }

  @patch('/afiliaciones/{id}/solicitudes', {
    responses: {
      '200': {
        description: 'Afiliaciones.Solicitudes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitudes, {partial: true}),
        },
      },
    })
    solicitudes: Partial<Solicitudes>,
    @param.query.object('where', getWhereSchemaFor(Solicitudes)) where?: Where<Solicitudes>,
  ): Promise<Count> {
    return this.afiliacionesRepository.solicitudes(id).patch(solicitudes, where);
  }

  @del('/afiliaciones/{id}/solicitudes', {
    responses: {
      '200': {
        description: 'Afiliaciones.Solicitudes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Solicitudes)) where?: Where<Solicitudes>,
  ): Promise<Count> {
    return this.afiliacionesRepository.solicitudes(id).delete(where);
  }
}
