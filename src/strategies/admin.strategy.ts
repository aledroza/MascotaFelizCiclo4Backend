


import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
//import {Request} from 'supertest';
import {AutenticacionService} from '../services';

export class EstrategiaAdministrador implements AuthenticationStrategy {
  name: string = 'administrador';
  /************************************************llamando a los servicios de autenticacion */
  constructor(
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService
  ) { }
  /*************************************************************************************** */

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    let token = parseBearerToken(request); // requeriendo el token
    if (token) {
      let datos = this.servicioAutenticacion.ValidarTokenJWT(token);  // enviando el token a validar
      if (datos) {
        if (datos.data.rol == 'administrador') {
          let perfil: UserProfile = Object.assign({
            nombre: datos.data.nombres
          });
          return perfil;
        }
      } else {
        throw new HttpErrors[401]("El token incluido no es válido")
      }

    } else {
      throw new HttpErrors[401]("No se ha incluido un token en la solicitud") // error token invalido
    }
  }



}
