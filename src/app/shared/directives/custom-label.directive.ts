import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit{

private htmlElement?: ElementRef<HTMLElement>;
private _color: string= 'red';
private _errors?:ValidationErrors| null;

@Input() set color(value:string) {
  this._color = value;
  this.setStyle();
}

@Input() set errors(value: ValidationErrors | null | undefined){
this._errors = value;
this.setErrorMessage();

}

  constructor(private el: ElementRef<HTMLElement>) {

    this.htmlElement = el;


   }
  ngOnInit(): void {

    this.setStyle();
  }


  setStyle():void{
    if(!this.htmlElement) return;

    this.htmlElement!.nativeElement.style.color = this._color;
  }


  setErrorMessage(): void {
    if (!this.htmlElement) return;
    if (!this._errors) {
      this.htmlElement.nativeElement.innerText = 'El campo está preparado.';
      return;
    }
    const errorMessages: string[] = [];
    if (this._errors['required']) {
      errorMessages.push('Este campo es requerido');
    }
    if (this._errors['minlength']) {
      const requiredLength = this._errors['minlength'].requiredLength;
      const actualLength = this._errors['minlength'].actualLength;
      errorMessages.push(`La longitud mínima es de ${requiredLength} caracteres. Longitud actual: ${actualLength}`);
    }
    if (this._errors['email']) {
      errorMessages.push('El formato del correo electrónico es inválido');
    }
    this.htmlElement.nativeElement.innerText = errorMessages.length > 0 ? errorMessages.join('. ') : 'El campo está preparado.';
  }
}
