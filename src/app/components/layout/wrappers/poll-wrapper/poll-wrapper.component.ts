import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/components/auth/auth.service';
import { User } from 'src/app/data/models/User';

@Component({
	selector: 'app-poll-wrapper',
	templateUrl: './poll-wrapper.component.html',
	styleUrls: ['./poll-wrapper.component.scss']
})
export class PollWrapperComponent {
	private _authSvc = inject(AuthService);

	allUsers$: Observable<Array<User>> | any = this._authSvc.getAllUsers();
}
