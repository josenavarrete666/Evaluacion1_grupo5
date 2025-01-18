import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone:false,
})
export class LoginPage implements OnInit {

usuarios={
  usuario:'',
  clave:''
};
usuariosBase=[
  {usuario: 'john.doe', clave : '12345'},
  {usuario: 'jane.doe', clave : '321'},
  {usuario: 'fran.end', clave : '1234'},
  {usuario: 'adm', clave : '123'},
]
msj='';
conexion = false;
  
constructor(private router: Router, private animation: AnimationController) {}

Spinner() {
  if (this.usuarios.usuario.length > 0 && this.usuarios.clave.length > 0) {
    if (
      this.usuarios.usuario == 'john.doe' &&
      this.usuarios.clave == '12345'
    ) {
      let navigationExtras: NavigationExtras = {
        state: { user: this.usuarios },
      };
      
      this.conexion = true;
      this.animacionLogin().play();
      this.msj = 'Conexion Exitosa';
      setTimeout(() => {
        this.msj = '';
        this.conexion = false;}, 2000);

    } else {
      this.msj = 'Credenciales erroneas';
    }
  } else {
    this.msj = 'Credenciales no pueden estar vacias';
  }
}

ngAfterContentInit() {}

  ngOnInit() {
  }

  redirec(){
    this.router.navigate(['/recuperar-password']);
  }
  principal() {
    const usuarioEncontrado = this.usuariosBase.find(
      (u) =>
        u.usuario === this.usuarios.usuario && u.clave === this.usuarios.clave
    );
  
    if (this.usuarios.usuario.length > 0 && this.usuarios.clave.length > 0) {
      if (usuarioEncontrado) {
        this.conexion = true;
        this.msj = 'Conectando...';
        this.animacionLogin().play();

        setTimeout(() => {
          let navigationExtras: NavigationExtras = {
            state: { user: this.usuarios },
          };
          localStorage.setItem('usuario', JSON.stringify(usuarioEncontrado));
  
          this.msj = '';
          this.conexion = false;
          this.router.navigate(['/principal'], navigationExtras);},2000);
          
      } else {
        this.msj = 'Usuario no existe';
      }
    } else {
      this.msj = 'Los campos no pueden estar vacíos';
    }
  }
  
  animacionLogin() {
    const imagen = document.querySelector(
      '#container ion-card ion-card-header ion-img'
    ) as HTMLElement;

    const animacion = this.animation
      .create()
      .addElement(imagen)
      .duration(6000)
      .iterations(1)
      .keyframes([
        { offset: 0, transform: 'rotateY(0deg)' },
        { offset: 0.5, transform: 'rotateY(180deg)' },
        { offset: 1, transform: 'rotateY(0deg)' },
      ]);
    return animacion;
  }

//ANIMACIÓN DE LOGO//
  animacion() {
    const imagen = document.querySelector(
      '#container ion-card ion-card-header ion-img'
    ) as HTMLElement;
    const animacion = this.animation
      .create()
      .addElement(imagen)
      .duration(5000)
      .iterations(Infinity)
      .keyframes([
        {
          offset: 0,
          opacity: '1',
          border: '10px solid white',
          transform: 'translateX(0px)',
        },
        {
          offset: 0.25,
          opacity: '0.5',
          border: '10px solid red',
          transform: 'translateX(100px)',
        },
        {
          offset: 0.5,
          opacity: '1',
          border: '10px solid blue',
          transform: 'translateX(0px)',
        },
        {
          offset: 0.75,
          opacity: '1',
          border: '10px solid green',
          transform: 'translateX(-100px)',
        },
        {
          offset: 1,
          opacity: '1',
          border: '10px solid cyan',
          transform: 'translateX(0px)',
        },
      ]);
    /* Por ultimo le damos play a la animacion para que empiece */
    animacion.play();
  }

}
