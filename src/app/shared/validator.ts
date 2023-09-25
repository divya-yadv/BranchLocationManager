import { FormGroup } from '@angular/forms';

const validationMessages = {
  email: {
    required: 'Required',
    email: 'This email is invalid'
  },
  password: {
    required: 'Required',
    minlength: 'The password length must be greater than or equal to 8'
  },
  confirmPassword: {
    required: 'Required',
    match: 'Password does not match'
  },
  firstName: {
    required: 'Required'
  },
  lastName: {
    required: 'Required'
  }
};

export class Validator {
  validationMessages: any;
  constructor(private validationMessage: { [key: string]: { [key: string]: string } } = validationMessages) { }

  processErrorMessage(conatiner: FormGroup): { [key: string]: string } {
    const messages = {};
    for (const controlKey in conatiner.controls) {
      if (conatiner.controls.hasOwnProperty(controlKey)) {
        const controlProperty = conatiner.controls[controlKey];
        if (this.validationMessage[controlKey]) {
          messages[controlKey] = '';
          if ((controlProperty.dirty || controlProperty.touched) && (controlProperty.errors)) {
            Object.keys(controlProperty.errors).map(messageKey => {
              if (this.validationMessages[controlKey][messageKey]) {
                messages[controlKey] += this.validationMessage[controlKey][messageKey] + '';
              }
            })
          }
        }
      }
    }
    return messages;
  }
}
