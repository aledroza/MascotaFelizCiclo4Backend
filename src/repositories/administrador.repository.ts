import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Administrador, AdministradorRelations, Usuarios, Asesor, Solicitudes, Producto, Plan, Servicios, InformesA} from '../models';
import {UsuariosRepository} from './usuarios.repository';
import {AsesorRepository} from './asesor.repository';
import {SolicitudesRepository} from './solicitudes.repository';
import {ProductoRepository} from './producto.repository';
import {PlanRepository} from './plan.repository';
import {ServiciosRepository} from './servicios.repository';
import {InformesARepository} from './informes-a.repository';

export class AdministradorRepository extends DefaultCrudRepository<
  Administrador,
  typeof Administrador.prototype.id,
  AdministradorRelations
> {

  public readonly usuarios: BelongsToAccessor<Usuarios, typeof Administrador.prototype.id>;

  public readonly asesors: HasManyRepositoryFactory<Asesor, typeof Administrador.prototype.id>;

  public readonly solicitudes: HasManyRepositoryFactory<Solicitudes, typeof Administrador.prototype.id>;

  public readonly productos: HasManyRepositoryFactory<Producto, typeof Administrador.prototype.id>;

  public readonly plans: HasManyRepositoryFactory<Plan, typeof Administrador.prototype.id>;

  public readonly servicios: HasManyRepositoryFactory<Servicios, typeof Administrador.prototype.id>;

  public readonly informesAS: HasManyRepositoryFactory<InformesA, typeof Administrador.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>, @repository.getter('SolicitudesRepository') protected solicitudesRepositoryGetter: Getter<SolicitudesRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>, @repository.getter('ServiciosRepository') protected serviciosRepositoryGetter: Getter<ServiciosRepository>, @repository.getter('InformesARepository') protected informesARepositoryGetter: Getter<InformesARepository>,
  ) {
    super(Administrador, dataSource);
    this.informesAS = this.createHasManyRepositoryFactoryFor('informesAS', informesARepositoryGetter,);
    this.registerInclusionResolver('informesAS', this.informesAS.inclusionResolver);
    this.servicios = this.createHasManyRepositoryFactoryFor('servicios', serviciosRepositoryGetter,);
    this.registerInclusionResolver('servicios', this.servicios.inclusionResolver);
    this.plans = this.createHasManyRepositoryFactoryFor('plans', planRepositoryGetter,);
    this.registerInclusionResolver('plans', this.plans.inclusionResolver);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productoRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', solicitudesRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
    this.asesors = this.createHasManyRepositoryFactoryFor('asesors', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesors', this.asesors.inclusionResolver);
    this.usuarios = this.createBelongsToAccessorFor('usuarios', usuariosRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }
}
