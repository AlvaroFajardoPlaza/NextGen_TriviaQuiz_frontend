import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { Observable, first, firstValueFrom } from 'rxjs';
import { TriviaElement } from 'src/app/data/models/TriviaElement';
import { User } from 'src/app/data/models/User';

@Injectable({
	providedIn: 'root'
})
export class MyTriviaService {
	private _http = inject(HttpClient);
	prefix: string = ''; // No tenemos configurado ningún prefijo a nuestra api

	// Llamada al trivia random
	getRandomTrivia(): Observable<Array<TriviaElement>> {
		return this._http.get<Array<TriviaElement>>(
			`${environment.baseUrl}/random_trivia`
			// this.createHeaders()
		);
	}

	// Esta función nos permite manejar los valores de las categorñias y mandarlas dentro de la url
	sendCategoriesInUrl(categories: Record<number, boolean>) {
		//console.log("Estas son las categorias que enviamos al back: ", categories)
		const categoriesToUrl = Object.keys(categories).reduce((acc, id) => {
			if (categories[+id]) {
				acc.push(+id);
			}
			return acc;
		}, [] as Array<number>);

		console.log(
			'Estas son las categorias que referenciamos en la url y queremos mandar al back: ',
			categoriesToUrl
		);
		return categoriesToUrl;
	}

	// Llamada a la trivia por categorias:
	getCategorizedTrivia(
		categoriesToBack: Array<string>
	): Observable<Array<TriviaElement>> {
		try {
			return this._http.post<Array<TriviaElement>>(
				`${environment.baseUrl}/categorized_trivia`,
				categoriesToBack
			);
		} catch (error) {
			console.log('Parece que ha habido algún error: ', error);
			throw error;
		}
	}

	// Llamamos a las categorías
	getCategories(): Observable<Array<any>> {
		return this._http.get<Array<any>>(`${environment.baseUrl}/categories`);
	}

	// Función para obtener los resultados del trivia test
	async getTriviaAnswers(answers: any, loggedUser: any) {
		console.log('Estas son las respuestas enviadas por el user: ', answers);
		try {
			let finalScore = await firstValueFrom(
				this._http.post<Array<any>>(
					`${environment.baseUrl}/get_trivia_answers`,
					answers
					// this.createHeaders()
				)
			);
			return finalScore;
		} catch (error) {
			console.log('Parece que ha habido un error', error);
			throw error;
		}
	}

	// Esta función nos permite configurar los headers para nuestras llamadas HTTP.
	// Pero tener que implementarla en cada llamada no es óptimo
	// createHeaders() {
	// 	return {
	// 		headers: new HttpHeaders({
	// 			Authorization: localStorage.getItem('token')!
	// 		})
	// 	};
	// }
}
