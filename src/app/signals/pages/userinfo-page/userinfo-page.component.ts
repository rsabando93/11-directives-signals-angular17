import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user-request.interface';

@Component({
  selector: 'app-userinfo-page',
  templateUrl: './userinfo-page.component.html',
  styleUrl: './userinfo-page.component.css'
})
export class UserinfoPageComponent implements OnInit {

  private usersService = inject( UsersService ); //Forma actual de usar inyeccion de dependencia
  public userId = signal(1); //el usuario inicial va a ser el 1

  public currentUser = signal<User|undefined>(undefined); //currentUser puede ser undefined o un User - el currentUser al inicio va a ser undefined
  public userWasFound = signal(true);

  public fullName = computed<string>( () => { //propiedad computada
    if( !this.currentUser() ) return 'Usuario no encontrado';
    return `${this.currentUser()?.first_name} ${this.currentUser()?.last_name}`
  });

  ngOnInit(): void {
    this.loadUser( this.userId() );
  }

  loadUser( id: number ){
    if( id <= 0 ) return; //validacion de seguridad - si el id es menor a 0 no hace nada

    this.userId.set( id );
    // this.currentUser.set(undefined);

    this.usersService.getUserById( id )
    .subscribe( { //dispara la peticion
      next: (user) => { //si el user fue encontrado - next permite emitir el siguiente valor
        this.currentUser.set(user);
        this.userWasFound.set(true);
      },
      error: () => {   //si el user no fue encontrado - error si sucede algun error lo atrapa aqui
        this.currentUser.set(undefined);
        this.userWasFound.set(false);
      }
    });
    // .subscribe( user => {
    //   console.log(user);
    //   this.currentUser.set(user); //forma de añadir nuevos valores a una variable local
    // })
  }
}
