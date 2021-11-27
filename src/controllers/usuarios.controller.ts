import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Llaves} from '../config/llaves';
import {Credenciales, Usuarios} from '../models';
import {UsuariosRepository} from '../repositories';
import {AutenticacionService} from '../services';
/************************************** importando el paquete fetch */
const fetch = require('node-fetch');
/****************************************************************** */

export class UsuariosController {
  constructor(
    @repository(UsuariosRepository)
    public usuariosRepository: UsuariosRepository,
    /********************************************* importando servicio de autenticacion de services */
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService
    /********************************************************************************************** */
  ) { }

  /*****************************************metodo identificar usuarios ******************************* */
  @post("/identificarUsuarios",{
    responses:{
      '200':{
        description: "Identificacion de Usuarios"
      }
    }
  })
  async identificarUsuarios(
    @requestBody() credenciales: Credenciales
  ){
    let p = await this.servicioAutenticacion.IdentificarUsuarios(credenciales.usuario,credenciales.clave,credenciales.rol);
    if (p) {
      let token = this.servicioAutenticacion.GenerarTokenJWT(p);
      return{
        datos: {
          nombre: p.nombres,
          correo: p.correo,
          rol: p.rol,
          id: p.id
        },
        tk: token
      }

    } else {
      throw new HttpErrors[401]("Datos inválidos");

    }
  }
  /**************************************************************************************************** */

  @post('/usuarios')
  @response(200, {
    description: 'Usuarios model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuarios)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {
            title: 'NewUsuarios',
            exclude: ['id'],
          }),
        },
      },
    })
    usuarios: Omit<Usuarios, 'id'>,
  ): Promise<Usuarios> {
    /***************************** llamando a los metodos de autenticacion service */
    let clave = this.servicioAutenticacion.GenerarClave();                              /**********generando clave */
    let claveCifrada = this.servicioAutenticacion.cifrarClave(clave);                  /***********cifrando clave  */
    /**************************************************************************** */
    /****************************************asignado la clave cifrada al usuario */
    usuarios.clave = claveCifrada;
    /**************************************************************************** */
    let p = await this.usuariosRepository.create(usuarios);  /***************** creando un usuario en el repositorio */
    /******************************************************************************************************************** */

    /********************************************** notificando al usuario clave, usuario y rol correo y mensaje de texto */
    /******************* creando parametros del mensaje **************************************************************** */
    /********************************************************correo electronico*******************parametros *************/
    let destino = usuarios.correo;
    let asunto = 'Registro exitoso en La pagina; Mascota Feliz te saluda';
    let contenido = `Bienvenido  ${usuarios.nombres}, veterinaria Mascota Feliz le informa,  su nombre de usuario es:  ${usuarios.correo}, su contraseña es:  ${clave}, y su rol es: ${usuarios.rol}`;
    /************************************************************************************************************************* */

    /******************************************************************************mensaje de texto *******************parametros */
    let telefono = usuarios.telefono;
    /************************************************************************************************************************************************ */

    /************************************************* ruta de enlace para enviar el mensaje utilizando spyder y su conexion *********************** */
    //fetch(`http://127.0.0.1:5000/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
    fetch(`${Llaves.urlServicioNotificaciones}/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
      .then((data: any) => {
        console.log(data);
      })
    /**********************************************correo electronico ************************************************ */
    //fetch(`http://127.0.0.1:5000/sms?mensaje=${contenido}&telefono=${telefono}`)
    fetch(`${Llaves.urlServicioNotificaciones}/sms?mensaje=${contenido}&telefono=${telefono}`)
      .then((data: any) => {
        console.log(data);
      })
    /***************************************************************************************************************** */
    return p;

    /******************************************************************************************************************* */



  }

  @get('/usuarios/count')
  @response(200, {
    description: 'Usuarios model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuarios) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.usuariosRepository.count(where);
  }

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuarios model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuarios, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuarios) filter?: Filter<Usuarios>,
  ): Promise<Usuarios[]> {
    return this.usuariosRepository.find(filter);
  }

  @patch('/usuarios')
  @response(200, {
    description: 'Usuarios PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {partial: true}),
        },
      },
    })
    usuarios: Usuarios,
    @param.where(Usuarios) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.usuariosRepository.updateAll(usuarios, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuarios model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuarios, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Usuarios, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuarios>
  ): Promise<Usuarios> {
    return this.usuariosRepository.findById(id, filter);
  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuarios PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {partial: true}),
        },
      },
    })
    usuarios: Usuarios,
  ): Promise<void> {
    await this.usuariosRepository.updateById(id, usuarios);
  }

  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuarios PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuarios: Usuarios,
  ): Promise<void> {
    await this.usuariosRepository.replaceById(id, usuarios);
  }

  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuarios DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuariosRepository.deleteById(id);
  }
}
