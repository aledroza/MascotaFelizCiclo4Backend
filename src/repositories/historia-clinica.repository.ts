import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {HistoriaClinica, HistoriaClinicaRelations, Mascota, Cliente} from '../models';
import {MascotaRepository} from './mascota.repository';
import {ClienteRepository} from './cliente.repository';

export class HistoriaClinicaRepository extends DefaultCrudRepository<
  HistoriaClinica,
  typeof HistoriaClinica.prototype.id,
  HistoriaClinicaRelations
> {

  public readonly mascota: BelongsToAccessor<Mascota, typeof HistoriaClinica.prototype.id>;

  public readonly cliente: BelongsToAccessor<Cliente, typeof HistoriaClinica.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(HistoriaClinica, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
  }
}
