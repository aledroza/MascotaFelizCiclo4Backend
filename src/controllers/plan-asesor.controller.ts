import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Plan,
  Asesor,
} from '../models';
import {PlanRepository} from '../repositories';

export class PlanAsesorController {
  constructor(
    @repository(PlanRepository)
    public planRepository: PlanRepository,
  ) { }

  @get('/plans/{id}/asesor', {
    responses: {
      '200': {
        description: 'Asesor belonging to Plan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Asesor)},
          },
        },
      },
    },
  })
  async getAsesor(
    @param.path.string('id') id: typeof Plan.prototype.id,
  ): Promise<Asesor> {
    return this.planRepository.asesor(id);
  }
}
