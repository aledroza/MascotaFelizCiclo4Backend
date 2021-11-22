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
  Usuarios,
  Ingreso,
} from '../models';
import {UsuariosRepository} from '../repositories';

export class UsuariosIngresoController {
  constructor(
    @repository(UsuariosRepository) protected usuariosRepository: UsuariosRepository,
  ) { }

  @get('/usuarios/{id}/ingresos', {
    responses: {
      '200': {
        description: 'Array of Usuarios has many Ingreso',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ingreso)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Ingreso>,
  ): Promise<Ingreso[]> {
    return this.usuariosRepository.ingresos(id).find(filter);
  }

  @post('/usuarios/{id}/ingresos', {
    responses: {
      '200': {
        description: 'Usuarios model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ingreso)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuarios.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ingreso, {
            title: 'NewIngresoInUsuarios',
            exclude: ['id'],
            optional: ['usuariosId']
          }),
        },
      },
    }) ingreso: Omit<Ingreso, 'id'>,
  ): Promise<Ingreso> {
    return this.usuariosRepository.ingresos(id).create(ingreso);
  }

  @patch('/usuarios/{id}/ingresos', {
    responses: {
      '200': {
        description: 'Usuarios.Ingreso PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ingreso, {partial: true}),
        },
      },
    })
    ingreso: Partial<Ingreso>,
    @param.query.object('where', getWhereSchemaFor(Ingreso)) where?: Where<Ingreso>,
  ): Promise<Count> {
    return this.usuariosRepository.ingresos(id).patch(ingreso, where);
  }

  @del('/usuarios/{id}/ingresos', {
    responses: {
      '200': {
        description: 'Usuarios.Ingreso DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Ingreso)) where?: Where<Ingreso>,
  ): Promise<Count> {
    return this.usuariosRepository.ingresos(id).delete(where);
  }
}
