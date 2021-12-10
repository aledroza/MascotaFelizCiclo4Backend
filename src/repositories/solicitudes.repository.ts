import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Solicitudes, SolicitudesRelations, Cliente, Afiliaciones, Administrador, Asesor} from '../models';
import {ClienteRepository} from './cliente.repository';
import {AfiliacionesRepository} from './afiliaciones.repository';
import {AdministradorRepository} from './administrador.repository';
import {AsesorRepository} from './asesor.repository';

export class SolicitudesRepository extends DefaultCrudRepository<
  Solicitudes,
  typeof Solicitudes.prototype.id,
  SolicitudesRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Solicitudes.prototype.id>;

  public readonly afiliaciones: BelongsToAccessor<Afiliaciones, typeof Solicitudes.prototype.id>;

  public readonly administrador: BelongsToAccessor<Administrador, typeof Solicitudes.prototype.id>;

  public readonly asesor: BelongsToAccessor<Asesor, typeof Solicitudes.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('AfiliacionesRepository') protected afiliacionesRepositoryGetter: Getter<AfiliacionesRepository>, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>,
  ) {
    super(Solicitudes, dataSource);
    this.asesor = this.createBelongsToAccessorFor('asesor', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesor', this.asesor.inclusionResolver);
    this.administrador = this.createBelongsToAccessorFor('administrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
    this.afiliaciones = this.createBelongsToAccessorFor('afiliaciones', afiliacionesRepositoryGetter,);
    this.registerInclusionResolver('afiliaciones', this.afiliaciones.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
