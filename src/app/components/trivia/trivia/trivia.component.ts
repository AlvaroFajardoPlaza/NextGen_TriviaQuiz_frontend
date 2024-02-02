import { Component, OnInit, inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TriviaElement } from 'src/app/data/models/TriviaElement.interface';
import { MyTriviaService } from '../my-trivia.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.scss']
})
export class TriviaComponent implements OnInit{
  private _triviaSvc = inject(MyTriviaService)
  private _router = inject(Router)

  triviaTest$: Observable<Array<any>> = this._triviaSvc.getRandomTrivia();
  randomTest: Array<TriviaElement> = [];

  categories$: Observable<Array<any>> = this._triviaSvc.getCategories();

  ngOnInit(): void {
    console.log("renderizamos el componente trivia")
    this.oneMinuteCounter()
    // console.log(this.triviaTest$)
  }


  // El initialCounter puede ser una variable que manejen los usuarios
  initialCounter: number = 45
  oneMinuteCounter() {
    const count: any = document.querySelector(".counter")
    // let counter = 60

    setInterval(() => {
      if(this.initialCounter > 0) {
        this.initialCounter--;
        count.innerHTML = this.initialCounter.toString();
      } else {
        this.navigateHome()
      }
    }, 1000)
  }


  openGoBackModal() {
    console.log("abrimos modal");
    // this.navigateHome();
  }

  navigateHome() {
    return this._router.navigate([''])
  }

  getResults() {
    return console.log("Solicitamos los resultados al backend!")
  }

}
