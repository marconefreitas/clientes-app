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
    return this.http.post<Cliente>( `${this.url}` , cliente);
  } 
  atualizar(cliente : Cliente) : Observable<any> {
    return this.http.put<Cliente>( `${this.url}/${cliente.id}`, cliente,);
  } 
  deletarCliente(cliente : Cliente): Observable<any>{
    return this.http.delete<Cliente>(`${this.url}/${cliente.id}`);
  }

  getCliente() : Cliente {
    let cliente :Cliente = new Cliente();
    cliente.nome = 'Marcone';
    cliente.cpf = '8888888888';
    return cliente;
  }
  getClientes() : Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url );
  }
  getClienteById(id:number) : Observable<Cliente>{
    return this.http.get<any>(`${this.url}/${id}`);
  }

}
