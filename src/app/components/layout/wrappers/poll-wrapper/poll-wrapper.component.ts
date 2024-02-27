import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/components/auth/auth.service';
import { User } from 'src/app/data/models/User';

@Component({
	selector: 'app-poll-wrapper',
	templateUrl: './poll-wrapper.component.html',
	styleUrls: ['./poll-wrapper.component.scss']
})
export class PollWrapperComponent implements OnInit {
	private _authSvc = inject(AuthService);

	allUsers$: Observable<Array<User>> | any = this._authSvc.getAllUsers();
	users: Array<User> = [];

	ngOnInit(): void {
		this.users = this.allUsers$;
	}

	// Dentro de este componente, tenemos que hacer una llamada a todos los usuarios de la bbdd y recoger su username, score y trivias completed
}
