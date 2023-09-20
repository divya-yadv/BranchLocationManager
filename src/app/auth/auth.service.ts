import { Injectable } from "@angular/core";
import { BehaviorSubject, throwError } from "rxjs";
import { tap,catchError } from "rxjs/operators";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

export interface AuthResponseData {
  Id: number;
  email: string;
  registered?: boolean;
}
@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  constructor(private http: HttpClient, private router: Router) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('', {
      email: email,
      password:password
    })
      .pipe(
        catchError(this.handleError),
        tap(resData=>{
          const user = new User(email);
          this.user.next(user);
          localStorage.setItem('userData', JSON.stringify(user));
        })
    );
  }
  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('', {
      email: email,
      password: password
    })
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          const user = new User(email);
          this.user.next(user);
          localStorage.setItem('userData', JSON.stringify(user));
        })
      );
  }
  logout() {
    this.user.next({ email: '' });
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
  }

    private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
