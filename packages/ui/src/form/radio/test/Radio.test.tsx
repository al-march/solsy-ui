import { cleanup, fireEvent, render, screen } from 'solid-testing-library';
import { Radio, RadioColor, RadioSelector, RadioSize } from '../Radio';
import { ObjectKeys } from '../../../utils/object';

type Classes = {
    main: string,
    colors: Record<RadioColor, string>,
    sizes: Record<RadioSize, string>,
}

const addPrefix = (name: string) => `radio-${name}`;

const classes: Classes = {
    main: 'radio',
    colors: {
        accent: addPrefix('accent'),
        primary: addPrefix('primary'),
        secondary: addPrefix('secondary'),
    },
    sizes: {
        lg: addPrefix('lg'),
        md: addPrefix('md'),
        sm: addPrefix('sm'),
        xs: addPrefix('xs'),
    }
};

const {RADIO} = RadioSelector;

describe('Radio', () => {

    test('should be rendered', () => {
        render(() => <Radio/>);
        const input = screen.getByTestId(RADIO);
        expect(input).toBeInTheDocument();
    });

    test('should be emit onInput', () => {
        const onInput = jest.fn();
        render(() => <Radio onInput={onInput}/>);
        const input = screen.getByTestId(RADIO);
        fireEvent.input(input);
        expect(onInput).toBeCalled();
    });

    test('should be emit onChange', () => {
        const onChange = jest.fn();
        render(() => <Radio onChange={onChange}/>);
        const input = screen.getByTestId(RADIO);
        fireEvent.change(input);
        expect(onChange).toBeCalled();
    });

    test('should be emit onFocus', () => {
        const onFocus = jest.fn();
        render(() => <Radio onFocus={onFocus}/>);
        const input = screen.getByTestId(RADIO);
        fireEvent.focus(input);
        expect(onFocus).toBeCalled();
    });

    test('should be emit onBlur', () => {
        const onBlur = jest.fn();
        render(() => <Radio onBlur={onBlur}/>);
        const input = screen.getByTestId(RADIO);
        fireEvent.blur(input);
        expect(onBlur).toBeCalled();
    });

    test('should set size classes', () => {
        const {sizes} = classes;
        ObjectKeys(sizes).forEach(size => {
            render(() => <Radio size={size}/>);
            expect(screen.getByTestId(RADIO)).toHaveClass(sizes[size]);
            cleanup();
        });
    });

    test('should set custom classes', () => {
        const className = 'custom-class';
        render(() => <Radio class={className}/>);
        expect(screen.getByTestId(RADIO)).toHaveClass(className);
    });
});
