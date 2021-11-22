import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Registro,
  Usuarios,
} from '../models';
import {RegistroRepository} from '../repositories';

export class RegistroUsuariosController {
  constructor(
    @repository(RegistroRepository)
    public registroRepository: RegistroRepository,
  ) { }

  @get('/registros/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Usuarios belonging to Registro',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuarios)},
          },
        },
      },
    },
  })
  async getUsuarios(
    @param.path.string('id') id: typeof Registro.prototype.id,
  ): Promise<Usuarios> {
    return this.registroRepository.usuarios(id);
  }
}
