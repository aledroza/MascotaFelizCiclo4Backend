import {injectable, /* inject, */ BindingScope} from '@loopback/core';
/*********************************************************************************************** */
const generador = require("password-generator");  /***** importando el paqueta para generar clave */
const cryptoJS  = require("crypto-js");          /***  importando el paquete para encriptar clave */
/*********************************************************************************************** */
@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */
/************************* Generando Clave automatica de 8 caracteres *****************************/
  GenerarClave(){
    let clave = generador(8, false);
    return clave;
  }
/************************ Encriptando clave automatica de 8 caracteres ****************************/
  cifrarClave(clave:string){
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }
/*********************************************************************************************** */

}
