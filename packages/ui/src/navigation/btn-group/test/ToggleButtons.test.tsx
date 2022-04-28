import { Component, For } from 'solid-js';
import { cleanup, fireEvent, render } from 'solid-testing-library';
import { ToggleButtonGroupProps, ToggleButtonsGroup } from '../ToggleButtonsGroup';
import { ToggleButton } from '../ToggleButton';


const toggleButtons = ['first', 'second', 'third'];
const ToggleButtonsSingleTest: Component<ToggleButtonGroupProps> = (props) => {
    return (
        <ToggleButtonsGroup {...props}>
            <For each={toggleButtons}>
                {(btn) => <ToggleButton value={btn}>{btn}</ToggleButton>}
            </For>
        </ToggleButtonsGroup>
    );
};

const isButtonActive = (button: HTMLElement) => button.classList.contains('btn-active');

describe('ToggleButtons.single', () => {

    test('should be rendered', async () => {
        const {container} = render(() => (
            <ToggleButtonsSingleTest/>
        ));

        expect(container.querySelectorAll('button').length).toBe(3);
    });

    test('should be active by click', async () => {
        let value = '';
        const {container} = render(() => (
            <ToggleButtonsSingleTest onChange={e => value = e}/>
        ));

        const [first, second] = Array.from(
            container.querySelectorAll('button')
        );
        const [firstValue, secondValue] = toggleButtons;

        fireEvent.click(first);

        expect(isButtonActive(first)).toBeTruthy()
        expect(isButtonActive(second)).toBeFalsy();
        expect(value).toStrictEqual(firstValue);

        fireEvent.click(second);

        expect(isButtonActive(second)).toBeTruthy()
        expect(isButtonActive(first)).toBeFalsy();
        expect(value).toStrictEqual(secondValue);
    });

    test('should set default value', () => {
        let [defaultValue] = toggleButtons;
        let result = render(() => (
            <ToggleButtonsSingleTest defaultValue={defaultValue}/>
        ));

        let buttons = Array.from(
            result.container.querySelectorAll('button')
        );

        expect(isButtonActive(buttons[0])).toBeTruthy();
        expect(isButtonActive(buttons[1])).toBeFalsy();
        cleanup();

        defaultValue = toggleButtons[1];
        result = render(() => (
            <ToggleButtonsSingleTest defaultValue={defaultValue}/>
        ));

        buttons = Array.from(
            result.container.querySelectorAll('button')
        );

        expect(isButtonActive(buttons[0])).not.toBeTruthy();
        expect(isButtonActive(buttons[1])).toBeTruthy();
    });
});

describe('ToggleButtons.multiple', () => {

    test('should return a list', () => {
        let value: string[] = [];
        const result = render(() => (
            <ToggleButtonsSingleTest
                multiple
                onChange={e => value = e}
            />
        ));

        const buttons = result.container.querySelectorAll('button');
        const [firstBtn, secondBtn] = buttons;

        fireEvent.click(firstBtn);
        fireEvent.click(secondBtn);

        expect(value).toStrictEqual([toggleButtons[0], toggleButtons[1]]);

        fireEvent.click(firstBtn);
        fireEvent.click(secondBtn);

        expect(value).toStrictEqual([]);
    });

    test('should checked buttons by default value', () => {
        const defaultValues = [...toggleButtons];
        const result = render(() => (
            <ToggleButtonsSingleTest
                multiple
                defaultValue={defaultValues}
            />
        ));

        result.container.querySelectorAll('button').forEach(button => {
            expect(isButtonActive(button)).toBeTruthy();
        })
    })
});
