import { FormValidator } from '../types';

export class Validators {
    static required = (
        errorMessage = 'Required field'
    ): FormValidator<string | undefined> => (val) => (
        val === null || val === undefined || (typeof val === 'string' && val.length === 0)
            ? errorMessage
            : undefined
    );

    static minLength = (
        minLength: number,
        errorMessage = `Min length is ${minLength}`
    ): FormValidator<string | undefined> => (val) => (
        val === null || val === undefined || val.length < minLength
            ? errorMessage
            : undefined
    );

    static maxLength = (
        maxLength: number,
        errorMessage = `Max length is ${maxLength}`
    ): FormValidator<string | undefined> => (val) => (
        val === null || val === undefined || val.length > maxLength
            ? errorMessage
            : undefined
    );

    static emailValidator = (
        errorMessage = 'Invalid email'
    ): FormValidator<string | undefined> => (val) => (
        val === null || val === undefined || !Validators.emailRegex.test(val)
            ? errorMessage
            : undefined
    );

    private static emailRegex =
        // eslint-disable-next-line no-control-regex
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
}
