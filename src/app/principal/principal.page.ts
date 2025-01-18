import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: false,
})
export class PrincipalPage implements OnInit {
  logUser : any;
   
  constructor(private router : Router) { }
usuario : any; 
  ngOnInit() {
    const usuarioString = localStorage.getItem("usuario");
    if (usuarioString){
      this.usuario = JSON.parse(usuarioString);
    }
  }

  
volver(){
  this.router.navigate(['/login']);
}

}
