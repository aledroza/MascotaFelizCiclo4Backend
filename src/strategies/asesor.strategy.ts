
import {AuthenticationStrategy} from '@loopback/authentication';
//import {service} from '@loopback/core';
import {service} from '@loopback/core';
import {HttpErrors,Request} from '@loopback/rest';
//import {RequestOptions} from 'http';
import parseBearerToken from 'parse-bearer-token';
import {AutenticacionService} from '../services';
import {UserProfile} from '@loopback/security';

export class EstrategiaAsesor implements AuthenticationStrategy{
  name: string = 'asesor';

  /********************************** llamando los servicios de autenticacion ************ */
  constructor(
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService
  ){}
  /************************************************************************************** */

  async authenticate(request: Request) : Promise<UserProfile | undefined>
  {
    let token = parseBearerToken(request);
    if(token){
      let datos = this.servicioAutenticacion.ValidarTokenJWT(token);
      if(datos){
        if(datos.data.rol == "asesor"){
          let perfil: UserProfile = Object.assign({
            nombre: datos.data.nombres
          });
          return perfil;
        }
      }else {
        throw new HttpErrors[401]("El token incluido no es válido")
      }
    }else{
      throw new HttpErrors[401]("No se ha incluido un token en la solicitud")
    }

  }

}
