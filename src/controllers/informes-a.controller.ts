import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {InformesA} from '../models';
import {InformesARepository} from '../repositories';

export class InformesAController {
  constructor(
    @repository(InformesARepository)
    public informesARepository : InformesARepository,
  ) {}

  @post('/informes-as')
  @response(200, {
    description: 'InformesA model instance',
    content: {'application/json': {schema: getModelSchemaRef(InformesA)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InformesA, {
            title: 'NewInformesA',
            exclude: ['id'],
          }),
        },
      },
    })
    informesA: Omit<InformesA, 'id'>,
  ): Promise<InformesA> {
    return this.informesARepository.create(informesA);
  }

  @get('/informes-as/count')
  @response(200, {
    description: 'InformesA model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(InformesA) where?: Where<InformesA>,
  ): Promise<Count> {
    return this.informesARepository.count(where);
  }

  @get('/informes-as')
  @response(200, {
    description: 'Array of InformesA model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(InformesA, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(InformesA) filter?: Filter<InformesA>,
  ): Promise<InformesA[]> {
    return this.informesARepository.find(filter);
  }

  @patch('/informes-as')
  @response(200, {
    description: 'InformesA PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InformesA, {partial: true}),
        },
      },
    })
    informesA: InformesA,
    @param.where(InformesA) where?: Where<InformesA>,
  ): Promise<Count> {
    return this.informesARepository.updateAll(informesA, where);
  }

  @get('/informes-as/{id}')
  @response(200, {
    description: 'InformesA model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(InformesA, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(InformesA, {exclude: 'where'}) filter?: FilterExcludingWhere<InformesA>
  ): Promise<InformesA> {
    return this.informesARepository.findById(id, filter);
  }

  @patch('/informes-as/{id}')
  @response(204, {
    description: 'InformesA PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InformesA, {partial: true}),
        },
      },
    })
    informesA: InformesA,
  ): Promise<void> {
    await this.informesARepository.updateById(id, informesA);
  }

  @put('/informes-as/{id}')
  @response(204, {
    description: 'InformesA PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() informesA: InformesA,
  ): Promise<void> {
    await this.informesARepository.replaceById(id, informesA);
  }

  @del('/informes-as/{id}')
  @response(204, {
    description: 'InformesA DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.informesARepository.deleteById(id);
  }
}
