import { Injectable } from '@angular/core';
import { Cliente } from './clientes/cliente';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  url : string = environment.apiURL + '/api/clientes';
  constructor(private http: HttpClient) { 

  }

  salvar(cliente : Cliente) : Observable<Cliente> {
    let token = JSON.parse(localStorage.getItem("access_token"));
    let headers =  {
      'Authorization': 'Bearer ' + token.access_token
    };
    return this.http.post<Cliente>( `${this.url}` , cliente,  {headers});
  } 
  atualizar(cliente : Cliente) : Observable<any> {
    let token = JSON.parse(localStorage.getItem("access_token"));
    let headers =  {
      'Authorization': 'Bearer ' + token.access_token
    };
    return this.http.put<Cliente>( `${this.url}/${cliente.id}`, cliente,  {headers});
  } 
  deletarCliente(cliente : Cliente): Observable<any>{
    let token = JSON.parse(localStorage.getItem("access_token"));
    let headers =  {
      'Authorization': 'Bearer ' + token.access_token
    };
    return this.http.delete<Cliente>(`${this.url}/${cliente.id}`,  {headers});
  }

  getCliente() : Cliente {
    let cliente :Cliente = new Cliente();
    cliente.nome = 'Marcone';
    cliente.cpf = '8888888888';
    return cliente;
  }
  getClientes() : Observable<Cliente[]>{
    let token = JSON.parse(localStorage.getItem("access_token"));
    let headers =  {
      'Authorization': 'Bearer ' + token.access_token
    };

    return this.http.get<Cliente[]>(this.url, {headers});
  }
  getClienteById(id:number) : Observable<Cliente>{
    return this.http.get<any>(`${this.url}/${id}`);
  }

}
