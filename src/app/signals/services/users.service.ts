import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { SingleUserResponse, User } from '../interfaces/user-request.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http = inject (HttpClient );//Forma actual de usar inyeccion de dependencia
  private baseUrl = 'https://reqres.in/api/users';
  constructor() { }

  getUserById( id: number ): Observable<User>{

    return this.http.get<SingleUserResponse>(`${ this.baseUrl }/${ id }`)
    .pipe(
      map( response => response.data ), //optiene los datos del user
      // tap( console.log ),
    );
  }
}
