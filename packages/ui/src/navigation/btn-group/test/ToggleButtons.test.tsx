import { Component, For } from 'solid-js';
import { cleanup, fireEvent, render, screen } from 'solid-testing-library';
import { ButtonsGroupSelectors, ButtonsGroupProps, ButtonsGroup, ButtonGroupSize } from '../ButtonsGroup';
import { ButtonGroup } from '../ButtonGroup';


const toggleButtons = ['first', 'second', 'third'];
const ToggleButtonsSingleTest: Component<ButtonsGroupProps> = (props) => {
    return (
        <ButtonsGroup {...props}>
            <For each={toggleButtons}>
                {(btn) => <ButtonGroup value={btn}>{btn}</ButtonGroup>}
            </For>
        </ButtonsGroup>
    );
};

const isButtonActive = (button: HTMLElement) => button.classList.contains('btn-active');

describe('ToggleButtons', () => {

    test('should be rendered', async () => {
        render(() => (
            <ToggleButtonsSingleTest/>
        ));

        expect(screen.getAllByTestId(ButtonsGroupSelectors.BUTTON).length).toBe(3);
    });

    test('should set size classes', () => {
        const sizes: Record<ButtonGroupSize, string> = {
            lg: 'btn-lg',
            md: 'btn-md',
            sm: 'btn-sm',
            xs: 'btn-xs'
        };

        Object.keys(sizes).forEach(key => {
            const size = key as ButtonGroupSize;
            render(() => <ToggleButtonsSingleTest size={size}/>);
            screen.getAllByTestId(ButtonsGroupSelectors.BUTTON).forEach(button => {
                expect(button).toHaveClass(sizes[size]);
            });
            cleanup();
        });
    });

    test('should be active by click', async () => {
        let value = '';
        render(() => (
            <ToggleButtonsSingleTest onInput={e => value = e}/>
        ));

        const [first, second] = screen.getAllByTestId(ButtonsGroupSelectors.BUTTON);
        const [firstValue, secondValue] = toggleButtons;

        fireEvent.click(first);

        expect(isButtonActive(first)).toBeTruthy();
        expect(isButtonActive(second)).toBeFalsy();
        expect(value).toStrictEqual(firstValue);

        fireEvent.click(second);

        expect(isButtonActive(second)).toBeTruthy();
        expect(isButtonActive(first)).toBeFalsy();
        expect(value).toStrictEqual(secondValue);
    });

    test('should set default value', () => {
        let [value] = toggleButtons;
        render(() => (
            <ToggleButtonsSingleTest value={value}/>
        ));

        let buttons = screen.getAllByTestId(ButtonsGroupSelectors.BUTTON);

        expect(isButtonActive(buttons[0])).toBeTruthy();
        expect(isButtonActive(buttons[1])).toBeFalsy();
        cleanup();

        value = toggleButtons[1];
        render(() => (
            <ToggleButtonsSingleTest value={value}/>
        ));

        buttons = screen.getAllByTestId(ButtonsGroupSelectors.BUTTON);

        expect(isButtonActive(buttons[0])).not.toBeTruthy();
        expect(isButtonActive(buttons[1])).toBeTruthy();
    });

    test('should set index without defaultValue on button', () => {
        render(() => (
            <ButtonsGroup value={2}>
                <For each={toggleButtons}>
                    {(btn) => <ButtonGroup>{btn}</ButtonGroup>}
                </For>
            </ButtonsGroup>
        ));

        const buttons = screen.getAllByTestId(ButtonsGroupSelectors.BUTTON);
        const last = buttons[2];
        expect(isButtonActive(last)).toBeTruthy();
    });

    test('should toggle', async () => {
        render(() => (
            <ToggleButtonsSingleTest
                multiple
            />
        ));

        const [button] = screen.getAllByTestId(ButtonsGroupSelectors.BUTTON);

        fireEvent.click(button);
        expect(isButtonActive(button)).toBeTruthy();
        fireEvent.click(button);
        expect(isButtonActive(button)).not.toBeTruthy();
    });

    test('should return a list', () => {
        let value: string[] = [];
        render(() => (
            <ToggleButtonsSingleTest
                multiple
                onInput={e => value = e}
            />
        ));

        const buttons = screen.getAllByTestId(ButtonsGroupSelectors.BUTTON);
        const [firstBtn, secondBtn] = buttons;

        fireEvent.click(firstBtn);
        fireEvent.click(secondBtn);

        expect(value).toStrictEqual([toggleButtons[0], toggleButtons[1]]);
    });

    test('should checked buttons by default value', () => {
        const defaultValues = [...toggleButtons];
        render(() => (
            <ToggleButtonsSingleTest
                multiple
                value={defaultValues}
            />
        ));

        screen.getAllByTestId(ButtonsGroupSelectors.BUTTON).forEach(button => {
            expect(isButtonActive(button)).toBeTruthy();
        });
    });
});
