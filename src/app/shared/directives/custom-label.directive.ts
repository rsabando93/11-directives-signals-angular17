import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit{

  private htmlElement?: ElementRef<HTMLElement>; //elemento html referenciado
  private _color: string = 'red'; //variable a usar para cambiar el color del span
  private _errors?: ValidationErrors | null ; //si hay errores va a ser de tipo ValidationErrors y si no hay errores va a ser null

  @Input() set color( value: string){//Input recibe el valor del input del html(span) - [color]="color"
   // console.log({value});
    this._color = value;
    this.setStyle();
  }

  @Input() set errors( value: ValidationErrors | null | undefined ){
    this._errors = value;
    // console.log(value);
    this.setErrorMessage();

  }
  constructor(
    private el: ElementRef<HTMLElement> //hace referencia al span con la directiva [customLabel]
  ) {
    // console.log('constructor de la directiva');
    console.log(el);
    this.htmlElement = el;
    // this.htmlElement.nativeElement.innerHTML = 'Hola Mundo';
  }

  ngOnInit(): void {
    console.log('Directiva - ngOnInit');
    this.setStyle(); //inicializa el setStyle
  }

  setStyle(): void{ //metodo para cambiar el color del span
    if( !this.htmlElement ) return; //validacion de seguridad
    this.htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorMessage(): void {
    if( !this.htmlElement ) return;

    if( !this._errors ){
      this.htmlElement.nativeElement.innerHTML = ':)';
      return;
    }

    const errors = Object.keys(this._errors); //obtiene los errores del input
    // console.log(errors);

    if ( errors.includes('required') ){
      this.htmlElement.nativeElement.innerHTML = 'Este campo es requerido';
      return;
    }

    if ( errors.includes('minlength') ){
      const minLength = this._errors['minlength']['requiredLength'];
      const actualLength = this._errors['minlength']['actualLength'];
      this.htmlElement.nativeElement.innerHTML = `Min ${ actualLength }/${ minLength } caracteres`;
      return;
    }

    if ( errors.includes('email') ){
      this.htmlElement.nativeElement.innerHTML = 'Debe ser un correo valido';
      return;
    }

  }

}
