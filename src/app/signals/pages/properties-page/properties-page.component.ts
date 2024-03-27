import { Component, OnDestroy, OnInit, computed, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  selector: 'app-properties-page',
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css'
})
export class PropertiesPageComponent implements OnDestroy, OnInit {

  public counter = signal(10); //valor inicial 10

  public user = signal<User>({
    id: 1,
    email: 'george.bluth@reqres.in',
    first_name: 'George',
    last_name: 'Bluth',
    avatar: 'https://reqres.in/img/faces/1-image.jpg'
  });

  public fullName = computed( () => `${ this.user().first_name } ${ this.user().last_name }` ); //computed - propiedad de lectura
  public userChangedEffect = effect( () => { //effect() - se dispara la primera vez cuando se carga el componente
    // console.log('UserChangedEffect triggered');
    console.log( ` ${this.user().first_name} - ${ this.counter() }` ); //si hay un cambio en el user o en el counter este efecto de dispara
  });

  ngOnInit(): void { //demostracion de la limpieza automatica del efecto - Nota: no limpia el interval
    // setInterval( ()=> {
    //   this.counter.update( current => current +1 );

    //     // if ( this.counter() == 15 )
    //     // this.userChangedEffect.destroy();
    // },1000);
  }

  ngOnDestroy(): void {
    // this.userChangedEffect.destroy();
  }

  increaseBy( value: number ){
    this.counter.update( current => current + value );
  }

  onFieldUpdated( field: keyof User, value: string){ //keyof User - permite validar que el campo solo pueda ser de tipo de las propiedades de la interface User(email, first_name, etc)
    // console.log({field, value});

    //Mutaciones
    //update con metodo set
    // this.user.set({
    //   ...this.user(),
    //   [field]: value,
    // })

     //update con metodo update
    // this.user.update( current => ({
    //   ...current,
    //   [field]: value,
    // }))

    //update como se maneja actualmente
    this.user.update( current => ({...current, [field]: value}) );
    // this.user.update( current => {

    //   switch ( field ) {

    //     case 'email':
    //       current.email = value;
    //       break;

    //     case 'avatar':
    //       current.avatar = value;
    //       break;

    //     case 'first_name':
    //       current.first_name = value;
    //       break;

    //     case 'last_name':
    //       current.last_name = value;
    //       break;

    //     case 'id':
    //       current.id = Number( value );
    //     break;
    //   }


    //   return current;
    // } );



  }
}
