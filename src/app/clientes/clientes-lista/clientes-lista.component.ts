import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClientesService } from 'src/app/clientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clientes : Cliente[] = [];
  clienteSelecionado : Cliente;
  msgSucesso :string;
  msgErro :string;

  constructor(private service : ClientesService, private router : Router) { 

  }

  ngOnInit() {
    this.service
        .getClientes()
        .subscribe(response => {
             this.clientes = response;
              });
  }

  novoCadastro():void{
    this.router.navigate(['/clientes/form']);
  }

  preparaDelecao(cliente : Cliente){
    this.clienteSelecionado = cliente;
  }
  deletarCliente(cliente: Cliente){
    this.service.deletarCliente(cliente)
          .subscribe(response => { 
            this.msgSucesso = 'Cliente Deletado com sucesso';
            this.ngOnInit();
           },  erro => this.msgErro = 'Erro ao deletar o cliente')
  }

}
