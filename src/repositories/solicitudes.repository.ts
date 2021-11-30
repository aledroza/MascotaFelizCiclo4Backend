import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Solicitudes, SolicitudesRelations, Cliente, Afiliaciones} from '../models';
import {ClienteRepository} from './cliente.repository';
import {AfiliacionesRepository} from './afiliaciones.repository';

export class SolicitudesRepository extends DefaultCrudRepository<
  Solicitudes,
  typeof Solicitudes.prototype.id,
  SolicitudesRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Solicitudes.prototype.id>;

  public readonly afiliaciones: BelongsToAccessor<Afiliaciones, typeof Solicitudes.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('AfiliacionesRepository') protected afiliacionesRepositoryGetter: Getter<AfiliacionesRepository>,
  ) {
    super(Solicitudes, dataSource);
    this.afiliaciones = this.createBelongsToAccessorFor('afiliaciones', afiliacionesRepositoryGetter,);
    this.registerInclusionResolver('afiliaciones', this.afiliaciones.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
