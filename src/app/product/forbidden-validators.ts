import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function forbiddenValidator(forbiddenName: string):ValidatorFn{
    return (control :AbstractControl):ValidationErrors | null =>{
        const inputValue = control.value;
        if(inputValue === forbiddenName)
            return {forbidden :control.value};
        else 
            return null;
    }
}