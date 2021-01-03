import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username : string;
  password : string;
  loginError : boolean;
  cadastrando : boolean;
  mensagemSucesso : string ;
  erros : String[];

  constructor(private router : Router, private authService : AuthService) {

  }

  onSubmit(){
    this.authService
        .tentarLogar(this.username, this.password)
        .subscribe(response => {
          let accessToken = JSON.stringify(response);
          localStorage.setItem("access_token", accessToken);
          this.router.navigate(['/home']);

        }, errorResponse => {
          this.erros = ['Usuario e/ou senha incorreto']
        });
  }

  preparaCadastrar(event){
    event.preventDefault();
    this.cadastrando  = true;
  }
  
  cancelaCadastro(){
    this.cadastrando = false;
  }

  cadastrar(){
    const usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;
    this.authService
      .salvar(usuario)
      .subscribe(response => {
        this.mensagemSucesso  = "Cadastro realizado com sucesso.";
        this.loginError = false;
        this.cadastrando = false;
        this.username = '';
        this.password = '';
        this.erros = [];
      }, errorResponse => {
        this.erros = errorResponse.error.errors;
        this.loginError = true;
        this.mensagemSucesso = null;
        
      });

  }

}
