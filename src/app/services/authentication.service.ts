import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Constants } from '../contants';
import { Observable, throwError } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(
        private http: HttpClient,
        private userService: UserService
    ) { }

    // logout() {
    //     localStorage.removeItem('user');
    // }

    authenticate(username, password): Observable<any> {

        const body = new HttpParams()
            .set('username', username)
            .set('password', password);

        // Pipe here is RxJS - it links operators together
        return this.http.post(Constants.SERVER_URL + 'login', body, { 'responseType': 'text' })
            .pipe(
                map(response => {
                    if (!response.includes('Reason:') && !response.includes('Invalid credentials')) {
                        localStorage.setItem('user', btoa(username + ':' + password));
                    }
                }),
                catchError((err: any | HttpErrorResponse) => {
                    return throwError(err);
                })
            );
    }
}