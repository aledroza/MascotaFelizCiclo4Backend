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
import {InformesB} from '../models';
import {InformesBRepository} from '../repositories';

export class InformesBController {
  constructor(
    @repository(InformesBRepository)
    public informesBRepository : InformesBRepository,
  ) {}

  @post('/informes-bs')
  @response(200, {
    description: 'InformesB model instance',
    content: {'application/json': {schema: getModelSchemaRef(InformesB)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InformesB, {
            title: 'NewInformesB',
            exclude: ['id'],
          }),
        },
      },
    })
    informesB: Omit<InformesB, 'id'>,
  ): Promise<InformesB> {
    return this.informesBRepository.create(informesB);
  }

  @get('/informes-bs/count')
  @response(200, {
    description: 'InformesB model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(InformesB) where?: Where<InformesB>,
  ): Promise<Count> {
    return this.informesBRepository.count(where);
  }

  @get('/informes-bs')
  @response(200, {
    description: 'Array of InformesB model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(InformesB, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(InformesB) filter?: Filter<InformesB>,
  ): Promise<InformesB[]> {
    return this.informesBRepository.find(filter);
  }

  @patch('/informes-bs')
  @response(200, {
    description: 'InformesB PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InformesB, {partial: true}),
        },
      },
    })
    informesB: InformesB,
    @param.where(InformesB) where?: Where<InformesB>,
  ): Promise<Count> {
    return this.informesBRepository.updateAll(informesB, where);
  }

  @get('/informes-bs/{id}')
  @response(200, {
    description: 'InformesB model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(InformesB, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(InformesB, {exclude: 'where'}) filter?: FilterExcludingWhere<InformesB>
  ): Promise<InformesB> {
    return this.informesBRepository.findById(id, filter);
  }

  @patch('/informes-bs/{id}')
  @response(204, {
    description: 'InformesB PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InformesB, {partial: true}),
        },
      },
    })
    informesB: InformesB,
  ): Promise<void> {
    await this.informesBRepository.updateById(id, informesB);
  }

  @put('/informes-bs/{id}')
  @response(204, {
    description: 'InformesB PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() informesB: InformesB,
  ): Promise<void> {
    await this.informesBRepository.replaceById(id, informesB);
  }

  @del('/informes-bs/{id}')
  @response(204, {
    description: 'InformesB DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.informesBRepository.deleteById(id);
  }
}
