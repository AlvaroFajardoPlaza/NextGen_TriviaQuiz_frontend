import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription, firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/components/auth/auth.service';
import { MyTriviaService } from 'src/app/components/trivia/my-trivia.service';
import { User } from 'src/app/data/models/User';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {
	private __router = inject(Router);

	constructor() {}

	navigateToRegisterLogin() {
		this.__router.navigate(['auth']);
	}
}
