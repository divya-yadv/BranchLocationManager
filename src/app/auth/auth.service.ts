import { Injectable } from "@angular/core";
import { BehaviorSubject, throwError } from "rxjs";
import { tap,catchError } from "rxjs/operators";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from "../error.service";

export interface AuthResponseData {
  email: string;
  registered?: boolean;
}
@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  constructor(private http: HttpClient, private router: Router) { }

  signup(email: string, password: string, firstName: string, lastName: string) {
    return this.http.post<AuthResponseData>('https://localhost:7133/api/Account/register', {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName
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
    return this.http.post<AuthResponseData>('https://localhost:7133/api/Account/login', {
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
  autoLogin() {
    const userData: {
      email: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
    );
    this.user.next(loadedUser);
    
  }
  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
  }

  private handleError(errorRes: HttpErrorResponse) {
    //this.errorService.printError(errorRes.error.title);
      let errorMessage = 'An unknown error occurred!';
      //console.log(errorRes.error.title);
    if (!errorRes.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.title) {
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
