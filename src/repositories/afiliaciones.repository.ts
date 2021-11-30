import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Afiliaciones, AfiliacionesRelations, Cliente, Solicitudes} from '../models';
import {ClienteRepository} from './cliente.repository';
import {SolicitudesRepository} from './solicitudes.repository';

export class AfiliacionesRepository extends DefaultCrudRepository<
  Afiliaciones,
  typeof Afiliaciones.prototype.id,
  AfiliacionesRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Afiliaciones.prototype.id>;

  public readonly solicitudes: HasOneRepositoryFactory<Solicitudes, typeof Afiliaciones.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('SolicitudesRepository') protected solicitudesRepositoryGetter: Getter<SolicitudesRepository>,
  ) {
    super(Afiliaciones, dataSource);
    this.solicitudes = this.createHasOneRepositoryFactoryFor('solicitudes', solicitudesRepositoryGetter);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
