import { Injectable } from "@angular/core";
import { Subject } from "rxjs";


@Injectable({ providedIn:'root' })
export class ErrorService {
  lastError: string='Start Error';
  errorChanged = new Subject<string>();

  setError(message: string) {
    this.lastError = message;
    this.errorChanged.next(this.lastError);
    alert(this.lastError);
    console.log(this.lastError);
  }
  printError(message: string) {
    console.log(message);
    console.log(this.lastError);
    this.lastError = message;
    
  }
}
