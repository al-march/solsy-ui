export type FormValidator<T> = (value: T | undefined | null) => string | void;

export type FormValidatorsOption<Controls> = {
    [Name in keyof Partial<Controls>]: FormValidator<Controls[Name]> | Array<FormValidator<Controls[Name]>>;
};

export interface FormOptions<Controls> {
    defaultValues?: Partial<Controls>;
    validators?: FormValidatorsOption<Partial<Controls>>;
    onSubmit?: (values: Partial<Controls>) => void | Promise<void>;
}

export type FormErrorType<Controls> = { [Name in keyof Controls]?: string | null };
