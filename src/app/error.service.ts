import { Injectable } from "@angular/core";
import { Subject } from "rxjs";


@Injectable({ providedIn:'root' })
export class ErrorService {
  lastError: string;


  printError(message: string) {
    console.log(message);
    console.log(this.lastError);
    this.lastError = message;
   
  }
}
