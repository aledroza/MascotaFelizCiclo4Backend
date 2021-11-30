import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  HistoriaClinica,
  Cliente,
} from '../models';
import {HistoriaClinicaRepository} from '../repositories';

export class HistoriaClinicaClienteController {
  constructor(
    @repository(HistoriaClinicaRepository)
    public historiaClinicaRepository: HistoriaClinicaRepository,
  ) { }

  @get('/historia-clinicas/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to HistoriaClinica',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.string('id') id: typeof HistoriaClinica.prototype.id,
  ): Promise<Cliente> {
    return this.historiaClinicaRepository.cliente(id);
  }
}
