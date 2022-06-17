import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

interface Keys {
    [key: string]: any
}

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    public errors: Array<{
        id: string, summary: string, message: string[]
    }>

    setError<T extends {
        id: string, summary:
        string, message: string[]
    }>(error: T): void {

        this.errors = [...new Set([
            ...this.errors, error
        ])];
    }

    removeError(key: string): void {

        this.errors = this.errors?.filter(({ id }) => key != id)
    }

    clearErrors(): void {

        this.errors = [];
    }

    toString(): string {
        return (
            JSON.stringify(this.errors)
        );
    }

    validateForm(values: Keys, form: FormGroup): { valid: boolean, errors: string } {

        let arr: any = [];

        Object.entries(values).forEach(([key, _]) => {

            const { errors = null } = form.get(key) as { [key: string]: any };

            if (errors != null) {

                let { summary = null, ...rest } = errors;

                arr = [
                    ...arr, {
                        id: key, summary: summary, message: Object.values(rest)
                    }
                ]
            }
        });

        return ({
            valid: arr.length == 0,
            errors: JSON.stringify(arr)
        })
    }

    validateRequired(control: AbstractControl, message: Keys): Keys | null {

        const { errors, value } = control;

        if (!value) {

            return (
                { ...(errors || {}), ...message }
            )
        }
        return null
    }

    validateLength(control: AbstractControl, message: Keys, n: number = 0): Keys | void {

        const { errors, value } = control;

        if (value?.length < n) {

            return (
                { ...(errors || {}), ...message }
            )
        }
    }

}
