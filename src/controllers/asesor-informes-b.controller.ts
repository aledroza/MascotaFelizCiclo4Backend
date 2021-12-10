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
  Asesor,
  InformesB,
} from '../models';
import {AsesorRepository} from '../repositories';

export class AsesorInformesBController {
  constructor(
    @repository(AsesorRepository) protected asesorRepository: AsesorRepository,
  ) { }

  @get('/asesors/{id}/informes-bs', {
    responses: {
      '200': {
        description: 'Array of Asesor has many InformesB',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(InformesB)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<InformesB>,
  ): Promise<InformesB[]> {
    return this.asesorRepository.informesBS(id).find(filter);
  }

  @post('/asesors/{id}/informes-bs', {
    responses: {
      '200': {
        description: 'Asesor model instance',
        content: {'application/json': {schema: getModelSchemaRef(InformesB)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Asesor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InformesB, {
            title: 'NewInformesBInAsesor',
            exclude: ['id'],
            optional: ['asesorId']
          }),
        },
      },
    }) informesB: Omit<InformesB, 'id'>,
  ): Promise<InformesB> {
    return this.asesorRepository.informesBS(id).create(informesB);
  }

  @patch('/asesors/{id}/informes-bs', {
    responses: {
      '200': {
        description: 'Asesor.InformesB PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InformesB, {partial: true}),
        },
      },
    })
    informesB: Partial<InformesB>,
    @param.query.object('where', getWhereSchemaFor(InformesB)) where?: Where<InformesB>,
  ): Promise<Count> {
    return this.asesorRepository.informesBS(id).patch(informesB, where);
  }

  @del('/asesors/{id}/informes-bs', {
    responses: {
      '200': {
        description: 'Asesor.InformesB DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(InformesB)) where?: Where<InformesB>,
  ): Promise<Count> {
    return this.asesorRepository.informesBS(id).delete(where);
  }
}
