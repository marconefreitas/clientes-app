import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './login/usuario';

import {environment } from '../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl : string = environment.apiURL + "/api/usuarios";
  tokenUrl : string = environment.apiURL + environment.obterToken;
  clientId : string = environment.clientId;
  clientSecret : string = environment.clientSecret;

  jwtHelper : JwtHelperService = new JwtHelperService();

  constructor(private http : HttpClient) {

  }

  salvar(usuario : Usuario) : Observable<any>{
    return this.http.post<any>(this.apiUrl, usuario);
  
  }

  tentarLogar(username : string, password : string) : Observable<any>{
    const params = new HttpParams()
                            .set('username', username)
                            .set('password', password)
                            .set('grant_type', 'password')
                            .set('scope', 'read write');

    const headers = {
      'Authorization' : 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
      'Content-Type' : 'application/x-www-form-urlencoded'
    }
    return this.http.post<any>(this.tokenUrl, params.toString(), {headers});
  }

  isAuthenticated(): boolean {
    if (this.obterToken() ){
      return !this.jwtHelper.isTokenExpired(this.obterToken());
    } 
    return false;
    
  }

  obterToken(){
    const tokenString = localStorage.getItem("access_token");
    if (tokenString){
      const token = JSON.parse(tokenString).access_token;
      return token;

    }
    return null;
  }

  encerrarSessao(){
    localStorage.removeItem("access_token");
  }

  getUsuarioAutenticado(){
    
    if(this.obterToken()){
     return this.jwtHelper.decodeToken(this.obterToken()).user_name;
    }
    return null;
  }

}
