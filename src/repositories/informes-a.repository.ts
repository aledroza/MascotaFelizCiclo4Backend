import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {InformesA, InformesARelations, Administrador} from '../models';
import {AdministradorRepository} from './administrador.repository';

export class InformesARepository extends DefaultCrudRepository<
  InformesA,
  typeof InformesA.prototype.id,
  InformesARelations
> {

  public readonly administrador: BelongsToAccessor<Administrador, typeof InformesA.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>,
  ) {
    super(InformesA, dataSource);
    this.administrador = this.createBelongsToAccessorFor('administrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
  }
}
