import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Usuarios} from '../models';
import {UsuariosRepository} from '../repositories';
/*********************************************************************************************** */
const generador = require("password-generator");  /***** importando el paqueta para generar clave */
const cryptoJS = require("crypto-js");          /***  importando el paquete para encriptar clave */
const jwt = require("jsonwebtoken");            /************ importando el paquete generador de token */
/*********************************************************************************************** */

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */
    /******************************************Instanciando al repositorio de Usuarios **********/
    @repository(UsuariosRepository)
    public usuariosRepository: UsuariosRepository
    /****************************************************************************************** */
  ) { }

  /*
   * Add service methods here
   */
  /************************* Generando Clave automatica de 8 caracteres *****************************/
  GenerarClave() {
    let clave = generador(8, false);
    return clave;
  }
  /************************ Encriptando clave automatica de 8 caracteres ****************************/
  cifrarClave(clave: string) {
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }
  /*********************************************************************************************** */

  /********************************************* Metodo Identificar Usuarios ********************* */
  IdentificarUsuarios(usuario: string, clave: string, rol:string) {
    try {
      let p = this.usuariosRepository.findOne({where: {correo: usuario, clave: clave, rol:rol}});
      if (p) {
        return p;
      }
      return false;

    } catch {
      return false;

    }
  }
  /*********************************************************************************************** */

  /*************************************** Metodo Generar Token ********************************** */
  GenerarTokenJWT(usuario: Usuarios) {
    let token = jwt.sign({
      /****************************los datos que tendra el token **********************************/
      data: {
        id: usuario.id,
        correo: usuario.correo,
        nombres: usuario.nombres + " " + usuario.apellidos,
        rol: usuario.rol

      }
      /******************************************************************************************* */
    },
      Llaves.claveJWT);
    return token;
  }
  /*********************************************************************************************** */

  /***************************************** Metodo Validar token jwt **************************** */
  ValidarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    } catch {
      return false;
    }
  }
  /*********************************************************************************************** */


}
