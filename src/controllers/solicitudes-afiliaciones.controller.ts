import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Solicitudes,
  Afiliaciones,
} from '../models';
import {SolicitudesRepository} from '../repositories';

export class SolicitudesAfiliacionesController {
  constructor(
    @repository(SolicitudesRepository)
    public solicitudesRepository: SolicitudesRepository,
  ) { }

  @get('/solicitudes/{id}/afiliaciones', {
    responses: {
      '200': {
        description: 'Afiliaciones belonging to Solicitudes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Afiliaciones)},
          },
        },
      },
    },
  })
  async getAfiliaciones(
    @param.path.string('id') id: typeof Solicitudes.prototype.id,
  ): Promise<Afiliaciones> {
    return this.solicitudesRepository.afiliaciones(id);
  }
}
