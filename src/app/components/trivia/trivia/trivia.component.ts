import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, interval, map, switchMap, tap } from 'rxjs';
import { TriviaElement } from 'src/app/data/models/TriviaElement';
import { MyTriviaService } from '../my-trivia.service';

@Component({
	selector: 'app-trivia',
	templateUrl: './trivia.component.html',
	styleUrls: ['./trivia.component.scss']
})
export class TriviaComponent {
	private _triviaSvc = inject(MyTriviaService);
	private _router = inject(Router);
	private _activatedRoute = inject(ActivatedRoute);
	private _formBuilder = inject(FormBuilder);

	// EL formulario que recupera las respuestas del usuario
	form = this._formBuilder.group({});

	// Las categorías que nos llegan desde params
	selectedCategories: Array<string> = [];

	// El triviaTest$ contiene las preguntas, pero puede poblarse de dos maneras, desde la función isCategorizedOrRandom()
	triviaTest$: Observable<Array<TriviaElement>> =
		this._activatedRoute.queryParamMap.pipe(
			map((params: ParamMap) => params.get('categoriesSelected')),
			switchMap((categoriesSelected) => {
				if (categoriesSelected === null) {
					return this._triviaSvc.getRandomTrivia();
				} else {
					this.selectedCategories = JSON.parse(categoriesSelected);

					console.log(
						'Tenemos las categorias parseadas?????? ',
						this.selectedCategories
					);
					return this._triviaSvc.getCategorizedTrivia(
						this.selectedCategories
					);
				}
			}),
			tap((questions: Array<TriviaElement>) => {
				this.buildForm(questions);
			})
		);

	initialCounter: number = 9999;
	timer$ = interval(1000).pipe(
		map((_) => this.initialCounter--),
		tap((_) => this.initialCounter == 0 && this.navigateHome())
	);

	// ngOnInit(): void {
	// 	console.log('renderizamos el componente trivia');
	// 	this.isCategorizedOrRandom();
	// }

	// // Esta función es la que nos permite determinar si el usuario ha seleccionado un randomTrivia o un trivia por categorías.
	// // Primero analiza y parsea la información de la url y después determina a que función del servicio de trivia tiene que llamar.
	// isCategorizedOrRandom(): void {
	// 	const categoriesInUrl =
	// 		this._activatedRoute.snapshot.queryParamMap.get(
	// 			'categoriesSelected'
	// 		);
	// 	console.log('categorías que entran en la url: ', categoriesInUrl);

	// 	// IF: Si el valor es nulo, lanzamos la función de random trivia
	// 	// ELSE: Una vez que tenemos las categorias parseadas, simplemente podemos llamar a la función del triviaSvc categórico!!
	// 	if (categoriesInUrl === null) {
	// 		this.triviaTest$ = this._triviaSvc.getRandomTrivia().pipe(
	// 			tap((questions: Array<TriviaElement>) => {
	// 				this.buildForm(questions);
	// 			})
	// 		);
	// 	} else {
	// 		this.selectedCategories = JSON.parse(categoriesInUrl);

	// 		console.log(
	// 			'Tenemos las categorias parseadas?????? ',
	// 			this.selectedCategories
	// 		);
	// 		this.triviaTest$ = this._triviaSvc.getCategorizedTrivia(
	// 			this.selectedCategories
	// 		);
	// 		//  .pipe(tap((userAnswers:any) => {
	// 		//     this.buildForm(userAnswers)
	// 		//   }));
	// 	}
	// }

	// Tenemos que cargar nuestro form con el id de la pregunta y la respuesta marcada por el usuario.
	buildForm(questions: Array<TriviaElement>): void {
		for (const { id_pregunta } of questions) {
			this.form.setControl(
				id_pregunta.toString(),
				this._formBuilder.control(null, Validators.required)
			);
		}
	}
	async onSubmit() {
		// if (!this.form.valid) {
		// 	return alert('Responde todas las preguntas hijo de la gran puta.');
		// }
		//console.log("enviamos nuestras respuestas para corregir")
		console.log('Respuestas del usuario: ', this.form.value);

		const response = await this._triviaSvc.getTriviaAnswers(
			this.form.value
		);
		return response;
	}

	navigateHome() {
		return this._router.navigate(['']);
	}

	getResults() {
		return console.log('Solicitamos los resultados al backend!');
	}
}
