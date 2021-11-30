import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Cuenta, CuentaRelations, Cliente} from '../models';
import {ClienteRepository} from './cliente.repository';

export class CuentaRepository extends DefaultCrudRepository<
  Cuenta,
  typeof Cuenta.prototype.id,
  CuentaRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Cuenta.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Cuenta, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
