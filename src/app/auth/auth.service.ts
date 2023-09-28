import { Injectable } from "@angular/core";
import { BehaviorSubject, throwError } from "rxjs";
import { tap,catchError } from "rxjs/operators";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

export interface AuthResponseData {
  email: string;
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
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error) {
      return throwError(errorMessage);
    }
    if (errorRes.status == 500) {
      return throwError("Internal Server Error");
    }
    switch (Object.keys(errorRes.error)[0]) {
      case 'DuplicateUserName':
        errorMessage = 'This email exists already';
        break;
      case 'PasswordRequiresDigit':
        errorMessage = "Passwords must have at least one digit ('0'-'9').";
        break;
      case 'PasswordRequiresUpper':
        errorMessage = "Passwords must have at least one uppercase ('A'-'Z').";
        break;
      case 'PasswordRequiresNonAlphanumeric':
        errorMessage = "Passwords must have at least one non alphanumeric character.";
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is incorrect.';
        break;
      
    }
    return throwError(errorMessage);
  }
}
