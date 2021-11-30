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
import {Afiliaciones} from '../models';
import {AfiliacionesRepository} from '../repositories';

export class AfiliacionesController {
  constructor(
    @repository(AfiliacionesRepository)
    public afiliacionesRepository : AfiliacionesRepository,
  ) {}

  @post('/afiliaciones')
  @response(200, {
    description: 'Afiliaciones model instance',
    content: {'application/json': {schema: getModelSchemaRef(Afiliaciones)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Afiliaciones, {
            title: 'NewAfiliaciones',
            exclude: ['id'],
          }),
        },
      },
    })
    afiliaciones: Omit<Afiliaciones, 'id'>,
  ): Promise<Afiliaciones> {
    return this.afiliacionesRepository.create(afiliaciones);
  }

  @get('/afiliaciones/count')
  @response(200, {
    description: 'Afiliaciones model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Afiliaciones) where?: Where<Afiliaciones>,
  ): Promise<Count> {
    return this.afiliacionesRepository.count(where);
  }

  @get('/afiliaciones')
  @response(200, {
    description: 'Array of Afiliaciones model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Afiliaciones, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Afiliaciones) filter?: Filter<Afiliaciones>,
  ): Promise<Afiliaciones[]> {
    return this.afiliacionesRepository.find(filter);
  }

  @patch('/afiliaciones')
  @response(200, {
    description: 'Afiliaciones PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Afiliaciones, {partial: true}),
        },
      },
    })
    afiliaciones: Afiliaciones,
    @param.where(Afiliaciones) where?: Where<Afiliaciones>,
  ): Promise<Count> {
    return this.afiliacionesRepository.updateAll(afiliaciones, where);
  }

  @get('/afiliaciones/{id}')
  @response(200, {
    description: 'Afiliaciones model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Afiliaciones, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Afiliaciones, {exclude: 'where'}) filter?: FilterExcludingWhere<Afiliaciones>
  ): Promise<Afiliaciones> {
    return this.afiliacionesRepository.findById(id, filter);
  }

  @patch('/afiliaciones/{id}')
  @response(204, {
    description: 'Afiliaciones PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Afiliaciones, {partial: true}),
        },
      },
    })
    afiliaciones: Afiliaciones,
  ): Promise<void> {
    await this.afiliacionesRepository.updateById(id, afiliaciones);
  }

  @put('/afiliaciones/{id}')
  @response(204, {
    description: 'Afiliaciones PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() afiliaciones: Afiliaciones,
  ): Promise<void> {
    await this.afiliacionesRepository.replaceById(id, afiliaciones);
  }

  @del('/afiliaciones/{id}')
  @response(204, {
    description: 'Afiliaciones DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.afiliacionesRepository.deleteById(id);
  }
}
