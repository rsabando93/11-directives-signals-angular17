import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-counter-page',
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.css'
})
export class CounterPageComponent {

  public counter = signal(10); // propiedad WritableSignal(editable) - es decir se pueden manipular
  public squareCounter = computed( () => this.counter() * this.counter() ); //propiedad de solo lectura - computed se vulve a ejecutar cada vez que sus propiedades internas cambian( en este caso this.counter() )

  increaseBy( value: number ){
    // this.counter.set( this.counter() + value );
    this.counter.update( current => current + value ); //current = valor actual - current + value = valor final despues del update
  }
}
