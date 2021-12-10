import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Asesor, AsesorRelations, Administrador, InformesB, Solicitudes, Plan, Producto} from '../models';
import {AdministradorRepository} from './administrador.repository';
import {InformesBRepository} from './informes-b.repository';
import {SolicitudesRepository} from './solicitudes.repository';
import {PlanRepository} from './plan.repository';
import {ProductoRepository} from './producto.repository';

export class AsesorRepository extends DefaultCrudRepository<
  Asesor,
  typeof Asesor.prototype.id,
  AsesorRelations
> {

  public readonly administrador: BelongsToAccessor<Administrador, typeof Asesor.prototype.id>;

  public readonly informesBS: HasManyRepositoryFactory<InformesB, typeof Asesor.prototype.id>;

  public readonly solicitudes: HasManyRepositoryFactory<Solicitudes, typeof Asesor.prototype.id>;

  public readonly plans: HasManyRepositoryFactory<Plan, typeof Asesor.prototype.id>;

  public readonly productos: HasManyRepositoryFactory<Producto, typeof Asesor.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>, @repository.getter('InformesBRepository') protected informesBRepositoryGetter: Getter<InformesBRepository>, @repository.getter('SolicitudesRepository') protected solicitudesRepositoryGetter: Getter<SolicitudesRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Asesor, dataSource);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productoRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
    this.plans = this.createHasManyRepositoryFactoryFor('plans', planRepositoryGetter,);
    this.registerInclusionResolver('plans', this.plans.inclusionResolver);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', solicitudesRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
    this.informesBS = this.createHasManyRepositoryFactoryFor('informesBS', informesBRepositoryGetter,);
    this.registerInclusionResolver('informesBS', this.informesBS.inclusionResolver);
    this.administrador = this.createBelongsToAccessorFor('administrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
  }
}
