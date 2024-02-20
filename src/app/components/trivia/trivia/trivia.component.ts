import { Component, OnInit, inject } from '@angular/core';
import { Observable, Subscription, map, switchMap } from 'rxjs';
import { TriviaElement } from 'src/app/data/models/TriviaElement.interface';
import { MyTriviaService } from '../my-trivia.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.scss']
})
export class TriviaComponent implements OnInit{
  private _triviaSvc = inject(MyTriviaService)
  private _router = inject(Router)
  private _activatedRoute = inject(ActivatedRoute)
  private _formBuilder = inject(FormBuilder)

  // Las categorías que nos llegan desde params
  selectedCategories: Array<string> = []

  // El triviaTest$ contiene las preguntas, pero puede poblarse de dos maneras
  triviaTest$: Observable<Array<TriviaElement>> | any = [];
  //categorizedTest: Array<TriviaElement> = []

  categories$: Observable<Array<any>> = this._triviaSvc.getCategories();

  user_trivia_solution: FormGroup | any;
  
  constructor() {
    this.user_trivia_solution = this._formBuilder.group({
      user_answers: ['', []],
    })
  }

  ngOnInit(): void {
    console.log("renderizamos el componente trivia")
    this.isCategorizedOrRandom();
    this.oneMinuteCounter();
  }


  // Esta función es la que nos permite determinar si el usuario ha seleccionado un randomTrivia o un trivia por categorías.
  // Primero analiza y parsea la información de la url y después determina a que función del servicio de trivia tiene que llamar.
  isCategorizedOrRandom(): void {
    // En esta función, primero, tenemos que parsear el array que recibimos por params
    const categoriesInUrl = this._activatedRoute.snapshot.queryParamMap.get('categoriesSelected')
    console.log("categorías que entran en la url: ", categoriesInUrl)
    
    // IF: Si el valor es nulo, lanzamos la función de random trivia
    // ELSE: Una vez que tenemos las categorias parseadas, simplemente podemos llamar a la función del triviaSvc categórico!!
    if (categoriesInUrl === null) {
      // this.selectedCategories = new Array<string>();
      this.triviaTest$ = this._triviaSvc.getRandomTrivia()
    } else {
      this.selectedCategories = JSON.parse(categoriesInUrl);

      console.log("Tenemos las categorias parseadas?????? ", this.selectedCategories)
      this.triviaTest$ = this._triviaSvc.getCategorizedTrivia(this.selectedCategories)
    }
    
  };


  // Cuando el usuario envíe un trivia test al backend, envía un formulario con las 10 preguntas y las respuestas elegidas.
  sendAnswersForm() {
    // this.user_trivia_solution = this._formBuilder.group({
    //   answers: ['', [Validators.required]]
    // })
  }

  async onSubmit() {
    //console.log("enviamos nuestras respuestas para corregir")
    console.log("Respuestas del usuario: ", this.user_trivia_solution.value)
    const response = await this._triviaSvc.getTriviaAnswers(
      this.user_trivia_solution.value
    )
    return response
  }


  // El initialCounter puede ser una variable que manejen los usuarios
  initialCounter: number = 60
  oneMinuteCounter() {
    const count: any = document.querySelector(".counter")
    // let counter = 60

    setInterval(() => {
      if(this.initialCounter > 0) {
        this.initialCounter--;
        count.innerHTML = this.initialCounter.toString();
      // } else if(0 < this.initialCounter && this.initialCounter < 10) {
      //   this.initialCounter--;
      //   count.innerHTML = this.initialCounter.toString()
      //   count.innerHTML = document.createAttribute(".hurry_up")
      } else {
        this.navigateHome()
      }
    }, 1000)
  }

  navigateHome() {
    return this._router.navigate([''])
  }

  getResults() {
    return console.log("Solicitamos los resultados al backend!")
  }

}
