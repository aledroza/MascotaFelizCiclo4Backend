import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  InformesA,
  Administrador,
} from '../models';
import {InformesARepository} from '../repositories';

export class InformesAAdministradorController {
  constructor(
    @repository(InformesARepository)
    public informesARepository: InformesARepository,
  ) { }

  @get('/informes-as/{id}/administrador', {
    responses: {
      '200': {
        description: 'Administrador belonging to InformesA',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Administrador)},
          },
        },
      },
    },
  })
  async getAdministrador(
    @param.path.string('id') id: typeof InformesA.prototype.id,
  ): Promise<Administrador> {
    return this.informesARepository.administrador(id);
  }
}
