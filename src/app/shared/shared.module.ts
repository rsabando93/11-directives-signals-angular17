import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomLabelDirective } from './directives/custom-label.directive';



@NgModule({
  declarations: [
    CustomLabelDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CustomLabelDirective, //se exporta para poder usarla en otros coponentes
  ]
})
export class SharedModule { }
