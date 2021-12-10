import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  InformesB,
  Asesor,
} from '../models';
import {InformesBRepository} from '../repositories';

export class InformesBAsesorController {
  constructor(
    @repository(InformesBRepository)
    public informesBRepository: InformesBRepository,
  ) { }

  @get('/informes-bs/{id}/asesor', {
    responses: {
      '200': {
        description: 'Asesor belonging to InformesB',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Asesor)},
          },
        },
      },
    },
  })
  async getAsesor(
    @param.path.string('id') id: typeof InformesB.prototype.id,
  ): Promise<Asesor> {
    return this.informesBRepository.asesor(id);
  }
}
