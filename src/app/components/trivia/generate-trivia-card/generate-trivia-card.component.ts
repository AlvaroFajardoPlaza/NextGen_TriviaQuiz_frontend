import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyTriviaService } from '../my-trivia.service';
import { Observable, tap } from 'rxjs';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-generate-trivia-card',
  templateUrl: './generate-trivia-card.component.html',
  styleUrls: ['./generate-trivia-card.component.scss']
})
export class GenerateTriviaCardComponent{

  private _router = inject(Router)
  private _activatedRoute = inject(ActivatedRoute) // Esto nos servirá para enviar las categorias al servicio y recuperar el trivia categórico
  private _formBuilder = inject(FormBuilder)
  private _triviaSvc = inject(MyTriviaService)

  categories$: Observable<Array<any>> = this._triviaSvc.getCategories()
    .pipe( tap(categories => {
      this.cargarDatosCategoriasForm(categories)
    }))


  categorizedForm = this._formBuilder.group({
  })

  // Tenemos que crear nuestro formulario que recoja como mínimo, tres categorías de trivia
  cargarDatosCategoriasForm(categories: Array<Array<any>>): void {
    for (const [id, value] of categories) {
      this.categorizedForm.setControl(id, this._formBuilder.control(false))
    }
  };

  async onSubmit() {
    console.log("Valores que enviamos en el submit del formulario: ", this.categorizedForm.value);

    // Tenemos que manejar que existan 3 trues dentro del categorizedForm.value (es un objeto)
    const valores = Object.values(this.categorizedForm.value)
    let counter: number = 0
    for (let i=0; i< valores.length; i++) {
      if (valores[i] === true) {
        counter++
      }
    }
    console.log(counter)

    if (!(counter >= 3)) {
      console.log("No has introducido tres categorías")
      return
    } else {
      
      try {
        if (this.categorizedForm.valid){
          const paramsAsArray = this._triviaSvc.sendCategoriesInUrl(
            this.categorizedForm.value as any
          );
          // console.log("Esta es la respuesta que recibimos y que tenemos que mandar al componente de 'trivia': ", response)
          // // this._router.navigate(['trivia']);
          // return response

          // Navegamos al componente trivia, configurando en la url los ids de las categorías seleccionadas
          console.log("Mis urlParams:, ", paramsAsArray)

          const queryParams: any = {};
          queryParams.categoriesSelected = JSON.stringify(paramsAsArray)

          const navigationDynamicParams: NavigationExtras = {
            queryParams
          };

          return this._router.navigate(['/trivia'], navigationDynamicParams);
        
        } else {
          console.log("El formulario no es válido")
          return
        }
      } catch(error) {
        console.log("Ha habido un error: ", error)
        return error;
      }
    }
  };


  // Esta es la redirección al randomTrivia si no se introducen categorías
    goToRandomTrivia() {
      this._router.navigate(['trivia']);
    }

}
