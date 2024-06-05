import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomLabelDirective } from './directives/custom-label.directive';



@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    CustomLabelDirective
  ],
  exports:[
    CustomLabelDirective,
  ]
})
export class SharedModule { }
