import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {InformesB, InformesBRelations, Asesor} from '../models';
import {AsesorRepository} from './asesor.repository';

export class InformesBRepository extends DefaultCrudRepository<
  InformesB,
  typeof InformesB.prototype.id,
  InformesBRelations
> {

  public readonly asesor: BelongsToAccessor<Asesor, typeof InformesB.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>,
  ) {
    super(InformesB, dataSource);
    this.asesor = this.createBelongsToAccessorFor('asesor', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesor', this.asesor.inclusionResolver);
  }
}
