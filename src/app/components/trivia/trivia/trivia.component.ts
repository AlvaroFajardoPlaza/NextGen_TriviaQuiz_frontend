import { Component, OnInit, inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TriviaElement } from 'src/app/data/models/TriviaElement.interface';
import { MyTriviaService } from '../my-trivia.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.scss']
})
export class TriviaComponent implements OnInit{
  private _triviaSvc = inject(MyTriviaService)
  private _router = inject(Router)
  private _formBuilder = inject(FormBuilder)

  // El triviaTest$ contiene las preguntas, pero puede poblarse de dos maneras
  triviaTest$: Observable<Array<any>> = this._triviaSvc.getRandomTrivia();

  categories$: Observable<Array<any>> = this._triviaSvc.getCategories();

  
  user_trivia_solution: FormGroup | any;
  
  
  constructor() {
    this.user_trivia_solution = this._formBuilder.group({
      user_answers: ['', []],
    })
  }

  ngOnInit(): void {
    console.log("renderizamos el componente trivia")
    this.oneMinuteCounter()
  }

  // TriviaTest$ lo poblamos con un trivia categorico


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
  initialCounter: number = 59
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
