import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Cliente, ClienteRelations, Usuarios, Afiliaciones, Solicitudes, Pedido, Mascota, Cuenta, HistoriaClinica} from '../models';
import {UsuariosRepository} from './usuarios.repository';
import {AfiliacionesRepository} from './afiliaciones.repository';
import {SolicitudesRepository} from './solicitudes.repository';
import {PedidoRepository} from './pedido.repository';
import {MascotaRepository} from './mascota.repository';
import {CuentaRepository} from './cuenta.repository';
import {HistoriaClinicaRepository} from './historia-clinica.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly usuarios: BelongsToAccessor<Usuarios, typeof Cliente.prototype.id>;

  public readonly afiliaciones: HasManyRepositoryFactory<Afiliaciones, typeof Cliente.prototype.id>;

  public readonly solicitudes: HasManyRepositoryFactory<Solicitudes, typeof Cliente.prototype.id>;

  public readonly pedidos: HasManyRepositoryFactory<Pedido, typeof Cliente.prototype.id>;

  public readonly mascotas: HasManyRepositoryFactory<Mascota, typeof Cliente.prototype.id>;

  public readonly cuenta: HasOneRepositoryFactory<Cuenta, typeof Cliente.prototype.id>;

  public readonly historiaClinicas: HasManyRepositoryFactory<HistoriaClinica, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>, @repository.getter('AfiliacionesRepository') protected afiliacionesRepositoryGetter: Getter<AfiliacionesRepository>, @repository.getter('SolicitudesRepository') protected solicitudesRepositoryGetter: Getter<SolicitudesRepository>, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('CuentaRepository') protected cuentaRepositoryGetter: Getter<CuentaRepository>, @repository.getter('HistoriaClinicaRepository') protected historiaClinicaRepositoryGetter: Getter<HistoriaClinicaRepository>,
  ) {
    super(Cliente, dataSource);
    this.historiaClinicas = this.createHasManyRepositoryFactoryFor('historiaClinicas', historiaClinicaRepositoryGetter,);
    this.registerInclusionResolver('historiaClinicas', this.historiaClinicas.inclusionResolver);
    this.cuenta = this.createHasOneRepositoryFactoryFor('cuenta', cuentaRepositoryGetter);
    this.registerInclusionResolver('cuenta', this.cuenta.inclusionResolver);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
    this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidoRepositoryGetter,);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', solicitudesRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
    this.afiliaciones = this.createHasManyRepositoryFactoryFor('afiliaciones', afiliacionesRepositoryGetter,);
    this.registerInclusionResolver('afiliaciones', this.afiliaciones.inclusionResolver);
    this.usuarios = this.createBelongsToAccessorFor('usuarios', usuariosRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }
}
