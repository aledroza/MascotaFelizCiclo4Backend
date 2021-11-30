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
  Mascota,
  Plan,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaPlanController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/plan', {
    responses: {
      '200': {
        description: 'Mascota has one Plan',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Plan),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Plan>,
  ): Promise<Plan> {
    return this.mascotaRepository.plan(id).get(filter);
  }

  @post('/mascotas/{id}/plan', {
    responses: {
      '200': {
        description: 'Mascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(Plan)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascota.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plan, {
            title: 'NewPlanInMascota',
            exclude: ['id'],
            optional: ['mascotaId']
          }),
        },
      },
    }) plan: Omit<Plan, 'id'>,
  ): Promise<Plan> {
    return this.mascotaRepository.plan(id).create(plan);
  }

  @patch('/mascotas/{id}/plan', {
    responses: {
      '200': {
        description: 'Mascota.Plan PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plan, {partial: true}),
        },
      },
    })
    plan: Partial<Plan>,
    @param.query.object('where', getWhereSchemaFor(Plan)) where?: Where<Plan>,
  ): Promise<Count> {
    return this.mascotaRepository.plan(id).patch(plan, where);
  }

  @del('/mascotas/{id}/plan', {
    responses: {
      '200': {
        description: 'Mascota.Plan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Plan)) where?: Where<Plan>,
  ): Promise<Count> {
    return this.mascotaRepository.plan(id).delete(where);
  }
}
