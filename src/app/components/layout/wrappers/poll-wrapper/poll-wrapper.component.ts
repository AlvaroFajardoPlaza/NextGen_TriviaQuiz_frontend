import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/components/auth/auth.service';
import { User } from 'src/app/data/models/User';

@Component({
	selector: 'app-poll-wrapper',
	templateUrl: './poll-wrapper.component.html',
	styleUrls: ['./poll-wrapper.component.scss']
})
export class PollWrapperComponent implements OnInit {
	private _authSvc = inject(AuthService);
	private _fb = inject(FormBuilder);

	allUsers$: Observable<Array<User>> | any = this._authSvc.getAllUsers();
	filteredUsersList$: Observable<Array<User>> | any;
	searchForUserForm: FormGroup | any;

	constructor() {
		// Creamos nuestra search bar desde el constructor del componente
		this.searchForUserForm = this._fb.group({
			text: [null, Validators.required]
		});
	}

	ngOnInit(): void {
		this.filterUsers('');
	}

	// Funcionalidad para la Search Bar ----------------------------------------------------------------------------------------
	filterUsers(text: string) {
		console.log('Tenemos algo en el input?', text);
		if (!text) {
			console.log('No se ha introducido nada en el input');
			this.filteredUsersList$ = this.allUsers$;
			return;
		} else {
			// Tenemos que plantear un filter dentro del observable
			this.filteredUsersList$ = this.allUsers$.pipe(
				map((users: Array<User>) =>
					users.filter((user: User) =>
						user.username
							?.toLowerCase()
							.includes(text.toLowerCase())
					)
				)
			);
		}
	}
}
