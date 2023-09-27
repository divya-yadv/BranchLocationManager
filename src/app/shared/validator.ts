//import { AbstractControl, NG_VALIDATORS,Validator,ValidatorFn,validate } from '@angular/forms';
//import { BranchService } from '../branches/branches.service';
//import { Directive } from '@angular/core';

//@Directive({
//  selector: '[UniqueBuCode]',
//  providers: [{
//    provide: NG_VALIDATORS,
//    useExisting: UniqueValidateDirective,
//    multi: true
//  }]
//})


//export function UniqueBuCode(): ValidatorFn {
//  return branchService.getBranch(control.value) ? { 'Error': 'Branch with this BuCode5 already exists!' } : null;
//  return (control: AbstractControl): { [key: string]: any } | null =>
//    control.value?.toLowerCase() === 'blue'
//      ? null : { wrongColor: control.value };
//}
//export function UniqueValidateDirective implements Validator  {

 
//  validate(control: AbstractControl): { [key: string]: any } | null { 
   
//    return UniqueBuCode()(control);
//  }
 
//}


