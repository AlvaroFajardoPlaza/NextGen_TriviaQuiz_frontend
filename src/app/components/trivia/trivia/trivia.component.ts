import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, interval, map, switchMap, tap, timer } from 'rxjs';
import { TriviaElement } from 'src/app/data/models/TriviaElement';
import { MyTriviaService } from '../my-trivia.service';
import { User } from 'src/app/data/models/User';
import { AuthService } from '../../auth/auth.service';

@Component({
	selector: 'app-trivia',
	templateUrl: './trivia.component.html',
	styleUrls: ['./trivia.component.scss']
})
export class TriviaComponent {
	private _triviaSvc = inject(MyTriviaService);
	private _authSvc = inject(AuthService);
	private _router = inject(Router);
	private _activatedRoute = inject(ActivatedRoute);
	private _formBuilder = inject(FormBuilder);

	// Comprobamos que existe un user
	loggedUser$: Observable<User> = this._authSvc.User$;

	// Las categorías que nos llegan desde params
	selectedCategories: Array<string> = [];

	// El triviaTest$ contiene las preguntas, pero puede poblarse de dos maneras, desde la función isCategorizedOrRandom()
	triviaTest$: Observable<Array<TriviaElement>> =
		this._activatedRoute.queryParamMap.pipe(
			map((params: ParamMap) => params.get('categoriesSelected')),
			switchMap((categoriesSelected) => {
				// Dentro de esta ruta entramos siempre que no seleccionemos el trivia categórico.
				if (categoriesSelected === null) {
					return this._triviaSvc.getRandomTrivia();
				}
				// Solicitamos nuestro triviaTest en base a las categorias que mandamos por el front
				else {
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

			// Esta lógica, nos construye el formulario
			tap((questions: Array<TriviaElement>) => {
				this.buildForm(questions);
			})
		);

	initialCounter: number = 60;
	timer$ = interval(1000).pipe(
		map((_) => (this.initialCounter = this.initialCounter - 1)),
		tap((_) => this.initialCounter == 0 && this.navigateHome())
	);

	// El formulario que recupera las respuestas del usuario
	userAnswersForm = this._formBuilder.group({});
	finalScore: string = '0';

	buildForm(questions: Array<TriviaElement>): void {
		for (const { id_pregunta } of questions) {
			this.userAnswersForm.setControl(
				id_pregunta.toString(),
				this._formBuilder.control(null, Validators.required)
			);
		}
	}

	async onSubmit() {
		// Tenemos que mandar las respuestas y al usuario para devolver el resultado final y haber sumado ya el score.
		try {
			const response: any = await this._triviaSvc.getTriviaAnswers(
				this.userAnswersForm.value,
				this.loggedUser$
			);
			this.finalScore = response;
		} catch (error) {
			console.error('Algo ha salido mal');
		}
	}

	navigateHome() {
		return this._router.navigate(['']);
	}
}
