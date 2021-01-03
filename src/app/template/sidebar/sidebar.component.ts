import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  userLogado : string;
  constructor(private authServer : AuthService, private router : Router) { }

  ngOnInit() {
    this.userLogado = this.authServer.getUsuarioAutenticado();
  }

  logout(){
    this.authServer.encerrarSessao();
    this.router.navigate(['/login']);
  }
}
