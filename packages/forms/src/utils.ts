import { reconcile, SetStoreFunction } from 'solid-js/store';
import { FormErrorType, FormValidatorsOption } from './types';

/**
 * @internal
 * Object.entries with true types
 */
export const Entries = <T extends {}>(obj: T): [keyof T, T[keyof T]][] => {
    return Object.entries(obj) as [keyof T, T[keyof T]][];
};

/**
 * @internal
 * Validate controls by validators
 * and update errors store
 */
export const validateForm = <Controls>(
    controls: Controls,
    validators: FormValidatorsOption<Controls | undefined>,
    setError: SetStoreFunction<FormErrorType<Controls>>
) => {
    const validationErrors: any = {};

    if (!validators) {
        return true;
    }

    /**
     * Validate all controls
     */
    Entries(controls).forEach(([name, value]) => {
        // @ts-ignore
        const error = validateControl(name, value, validators);
        if (error) {
            validationErrors[name] = error;
        } else {
            delete validationErrors[name];
        }
    });

    setError(reconcile(validationErrors));
    return Object.keys(validationErrors).length === 0;
};


/**
 * @internal
 * Validate control by validators
 */
export const validateControl = <Controls extends {}, Name extends keyof Partial<Controls>, Value extends Controls[Name]>(
    controlName: Name,
    controlValue: Value,
    validatorOptions: FormValidatorsOption<Controls | undefined>,
): string | void => {

    if (!validatorOptions) {
        return;
    }

    const validators = validatorOptions[controlName];

    if (!validators) {
        return;
    }

    if (Array.isArray(validators)) {
        for (let i = 0; i < validators.length; i++) {
            const validatorCallback = validators[i];
            const error = validatorCallback(controlValue);
            if (error) {
                return error;
            }
        }
    } else {
        return validators(controlValue);
    }
};
