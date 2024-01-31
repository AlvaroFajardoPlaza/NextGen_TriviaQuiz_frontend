import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { environment } from 'src/app/environments/environment';
import { Observable } from 'rxjs';
import { TriviaElement } from 'src/app/data/models/TriviaElement.interface';

@Injectable({
  providedIn: 'root'
})
export class MyTriviaService {
  private _http = inject(HttpClient)
  prefix: string = "" // No tenemos configurado ningún prefijo a nuestra api

  // Llamada al trivia random
  getRandomTrivia(): Observable<Array<TriviaElement>> {
    return this._http.get<Array<TriviaElement>>(`${environment.baseUrl}/trivia`)
  }
}
