import { createMemo, createSignal, observable } from 'solid-js';
import { createStore, reconcile } from 'solid-js/store';
import { FormErrorType, FormOptions } from './types';
import { validateControl, validateForm } from './utils';

export function createForm<Controls extends {}>(
    formOptions: FormOptions<Controls> = {}
) {
    const [values, setValues] = createSignal<Partial<Controls>>(formOptions.defaultValues || {});
    const [errors, setErrors] = createStore<FormErrorType<Controls>>({});

    const control = <Name extends keyof Controls>(
        name: Name
    ) => {
        return {
            onInput: onInput(name),
            value: values()[name],
            name,
        };
    };

    const onInput = <Name extends keyof Controls>(name: Name) => (e: InputEvent | any) => {
        let value = e;

        if (e instanceof InputEvent) {
            value = (e.target as HTMLInputElement).value;
        }

        const errorMessage = validateControl(name, value, formOptions.validators) as string;
        setErrors(state => {
            return {...reconcile(state), [name]: errorMessage};
        });

        setValues(values => ({...values, [name]: value}));
    };

    /*
    * Set value of Form controls
    */
    const setValue = (controls: Partial<Controls>) => {
        setValues(state => ({...state, ...controls}));
        _validate(getValues());
    };

    const reset = <Name extends keyof Controls>(name?: Name) => {
        const controls = getValues();
        if (name) {
            controls[name as Name] = null as any;
            setValues((state) => ({...state, ...controls}));
            clearError(name);
        } else {
            Object.keys(controls).forEach(key => {
                controls[key as Name] = null as any;
            })
            setValues(() => ({...controls}));
            clearError();
        }
    }

    /*
    * Get value of Form controls
    */
    const getValues = createMemo(() => values());

    /*
    * Returns Observable of form changes
    */
    const watch = () => observable(values);

    /**
     * Form submit wrapper with validation
     */
    const submit = (e?: Event) => {
        e?.preventDefault();
        const onSubmit = formOptions.onSubmit;
        const values = getValues();

        if (_validate(values) && onSubmit) {
            onSubmit(values);
        }
    };

    /*
    * Clear error of Control
    */
    const clearError = <Name extends keyof Partial<Controls>>(
        name?: Name,
    ) => {
        if (name) {
            const clone = reconcile(errors);
            setErrors({...clone, [name]: null});
        } else {
            clearErrors();
        }
    };

    /*
    * Clear all errors of controls
    */
    const clearErrors = <Name extends keyof Partial<Controls>>() => {
        const clone = {...reconcile(errors)} as FormErrorType<Controls>;
        Object.keys(clone).forEach((key) => {
            clone[key as Name] = null;
        });
        setErrors(clone);
    };

    /**
     * @internal
     * Validate current controls
     */
    const _validate = (values: Partial<Controls>) => validateForm(values, formOptions.validators, setErrors);

    return {
        control,
        setValue,
        getValues,
        reset,
        watch,
        submit,
        errors,
        clearError
    };
}
