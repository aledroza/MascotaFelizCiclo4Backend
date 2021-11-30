import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mascota, MascotaRelations, Cliente, HistoriaClinica, Plan} from '../models';
import {ClienteRepository} from './cliente.repository';
import {HistoriaClinicaRepository} from './historia-clinica.repository';
import {PlanRepository} from './plan.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.id,
  MascotaRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Mascota.prototype.id>;

  public readonly historiaClinica: HasOneRepositoryFactory<HistoriaClinica, typeof Mascota.prototype.id>;

  public readonly plan: HasOneRepositoryFactory<Plan, typeof Mascota.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('HistoriaClinicaRepository') protected historiaClinicaRepositoryGetter: Getter<HistoriaClinicaRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>,
  ) {
    super(Mascota, dataSource);
    this.plan = this.createHasOneRepositoryFactoryFor('plan', planRepositoryGetter);
    this.registerInclusionResolver('plan', this.plan.inclusionResolver);
    this.historiaClinica = this.createHasOneRepositoryFactoryFor('historiaClinica', historiaClinicaRepositoryGetter);
    this.registerInclusionResolver('historiaClinica', this.historiaClinica.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
