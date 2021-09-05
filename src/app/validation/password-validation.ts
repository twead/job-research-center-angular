import { FormGroup } from '@angular/forms';

export function PasswordValidation(controlName: string, matchingControlName: string){

    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.passwordValidation) {
            return;
        }

        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ passwordValidation: true });
        } else {
            matchingControl.setErrors(null);
        }

    }

}