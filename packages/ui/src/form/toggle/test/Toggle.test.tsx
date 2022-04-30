import { cleanup, fireEvent, render, screen } from 'solid-testing-library';
import { Toggle, ToggleSelectors, ToggleClasses } from '../Toggle';
import { createSignal } from 'solid-js';
import { ObjectKeys } from '../../../utils/object';

describe('Toggle', () => {

    test('should be rendered', () => {
        render(() => <Toggle/>);
        expect(screen.getByTestId(ToggleSelectors.INPUT)).toBeInTheDocument();
    });

    test('should be checked', () => {
        render(() => <Toggle value={true}/>);
        expect(screen.getByTestId(ToggleSelectors.INPUT)).toBeChecked();
    });

    test('should update value by prop', () => {
        const [value, setValue] = createSignal(false);
        render(() => <Toggle indeterminate value={value()}/>);

        const input = screen.getByTestId(ToggleSelectors.INPUT) as HTMLInputElement;
        expect(input).not.toBeChecked();
        setValue(true);
        expect(input).toBeChecked();
    });

    test('should emit onInput', () => {
        const onInput = jest.fn();
        render(() => <Toggle onInput={onInput}/>);
        const input = screen.getByTestId(ToggleSelectors.INPUT);
        fireEvent.input(input);
        expect(onInput).toBeCalled();
    });

    test('should emit onChange', () => {
        const onChange = jest.fn();
        render(() => <Toggle onChange={onChange}/>);
        const input = screen.getByTestId(ToggleSelectors.INPUT);
        fireEvent.change(input);
        expect(onChange).toBeCalled();
    });

    test('should be checked by click', () => {
        render(() => <Toggle value={false}/>);
        const input = screen.getByTestId(ToggleSelectors.INPUT);
        fireEvent.click(input);
        expect(input).toBeChecked();
    });

    test('should be indeterminate', () => {
        render(() => <Toggle indeterminate/>);
        const input = screen.getByTestId(ToggleSelectors.INPUT);
        expect((input as HTMLInputElement).indeterminate).toBeTruthy();
    });

    test('should update indeterminate by prop', () => {
        const [indeterminate, setIndeterminate] = createSignal(false);
        render(() => <Toggle indeterminate={indeterminate()}/>);
        const input = screen.getByTestId(ToggleSelectors.INPUT) as HTMLInputElement;

        expect(input.indeterminate).toBeFalsy();
        setIndeterminate(true);
        expect(input.indeterminate).toBeTruthy();
    });

    test('should set color classes', () => {
        const {colors} = ToggleClasses;
        ObjectKeys(colors).forEach(color => {
            render(() => <Toggle color={color}/>);
            expect(screen.getByTestId(ToggleSelectors.INPUT)).toHaveClass(colors[color]);
            cleanup();
        });
    });

    test('should set size classes', () => {
        const {sizes} = ToggleClasses;
        ObjectKeys(sizes).forEach(size => {
            render(() => <Toggle size={size}/>);
            expect(screen.getByTestId(ToggleSelectors.INPUT)).toHaveClass(sizes[size]);
            cleanup();
        });
    });
});
