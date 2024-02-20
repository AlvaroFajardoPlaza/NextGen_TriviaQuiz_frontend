import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { environment } from 'src/app/environments/environment';
import { Observable, firstValueFrom } from 'rxjs';
import { TriviaElement } from 'src/app/data/models/TriviaElement.interface';

@Injectable({
  providedIn: 'root'
})
export class MyTriviaService {
  private _http = inject(HttpClient)
  prefix: string = "" // No tenemos configurado ningún prefijo a nuestra api

  // Llamada al trivia random
  getRandomTrivia(): Observable<Array<TriviaElement>> {
    return this._http.get<Array<TriviaElement>>(`${environment.baseUrl}/random_trivia`)
  }

  // Esta función nos permite manejar los valores de las categorñias y mandarlas dentro de la url
  sendCategoriesInUrl(categories: Record<number, boolean> ) {
    //console.log("Estas son las categorias que enviamos al back: ", categories)
    const categoriesToBack = Object.keys(categories).reduce((acc, id) => {
      if (categories[+id]){
        acc.push(+id)
      }
      return acc
    }, [] as Array<number>)

    console.log("Estas son las categorias que enviamos al back: ", categoriesToBack)
    return categoriesToBack
  };



  // Llamada a la trivia por categorias:
  getCategorizedTrivia(categoriesToBack: Array<string>) {
    try {
      const categorizedTriviaResult = firstValueFrom(
        this._http.post<Array<TriviaElement>>(`${environment.baseUrl}/categorized_trivia`,
        categoriesToBack)
      )
      console.log("Nuestras preguntas para la trivia Categórica: ", categorizedTriviaResult)
      // Tenemos que mandar este resultado a nuestro componente
      return categorizedTriviaResult
      
    } catch(error) {
      console.log("Parece que ha habido algún error: ", error)
      return error
    }
  }



  // Llamamos a las categorías
  getCategories(): Observable<Array<any>> {
    return this._http.get<Array<any>>(`${environment.baseUrl}/categories`)
  }

  // Función para obtener los resultados del trivia test
  getTriviaAnswers( answers: any ) {
    console.log("Estas son las respuestas enviadas por el user: ", answers)
    console.log("Solicitamos los resultados al server!")
  }

}
