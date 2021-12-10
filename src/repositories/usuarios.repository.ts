import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Usuarios, UsuariosRelations, Registro, Ingreso, Cliente, Administrador} from '../models';
import {RegistroRepository} from './registro.repository';
import {IngresoRepository} from './ingreso.repository';
import {ClienteRepository} from './cliente.repository';
import {AdministradorRepository} from './administrador.repository';

export class UsuariosRepository extends DefaultCrudRepository<
  Usuarios,
  typeof Usuarios.prototype.id,
  UsuariosRelations
> {

  public readonly registro: HasOneRepositoryFactory<Registro, typeof Usuarios.prototype.id>;

  public readonly ingresos: HasManyRepositoryFactory<Ingreso, typeof Usuarios.prototype.id>;

  public readonly clientes: HasManyRepositoryFactory<Cliente, typeof Usuarios.prototype.id>;

  public readonly administradors: HasManyRepositoryFactory<Administrador, typeof Usuarios.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RegistroRepository') protected registroRepositoryGetter: Getter<RegistroRepository>, @repository.getter('IngresoRepository') protected ingresoRepositoryGetter: Getter<IngresoRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>,
  ) {
    super(Usuarios, dataSource);
    this.administradors = this.createHasManyRepositoryFactoryFor('administradors', administradorRepositoryGetter,);
    this.registerInclusionResolver('administradors', this.administradors.inclusionResolver);
    this.clientes = this.createHasManyRepositoryFactoryFor('clientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
    this.ingresos = this.createHasManyRepositoryFactoryFor('ingresos', ingresoRepositoryGetter,);
    this.registerInclusionResolver('ingresos', this.ingresos.inclusionResolver);
    this.registro = this.createHasOneRepositoryFactoryFor('registro', registroRepositoryGetter);
    this.registerInclusionResolver('registro', this.registro.inclusionResolver);
  }
}
