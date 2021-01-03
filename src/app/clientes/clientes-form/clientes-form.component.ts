import { Component, OnInit } from '@angular/core';
import {Cliente} from '../cliente';
import {ClientesService} from '../../clientes.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente :Cliente;
  success :boolean = false;
  errors : String[];
  id  :number;



  constructor(private service :ClientesService, 
              private router : Router,
              private activatedRoute : ActivatedRoute ) { 
    this.cliente =  new Cliente();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params =>{
      if (params.id){
        this.service.getClienteById(params['id'])
            .subscribe(response =>{
              this.cliente = response;
        },             errorResponse => this.cliente = new Cliente());
      }
    });
  
 
  }



  onSubmit(){
    if (this.id) {
      this.service
        .atualizar(this.cliente)
        .subscribe(response => {
          this.success = true;
          this.errors = null;
        }, errorResponse => {
          this.success = false;
          this.errors = ['Erro ao atualizar o cliente'];
        })
    } else {
      this.service
        .salvar(this.cliente)
        .subscribe(response => {
          this.success = true;
          this.errors = null;
          this.cliente = response;
        }, errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors;
      })
    }
  }
  

  
  voltarHome():void {
    this.router.navigate(['/clientes/lista']);
  }
}
