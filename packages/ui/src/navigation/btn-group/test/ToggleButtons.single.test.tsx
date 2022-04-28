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

describe('ToggleButtons.single', () => {

    test('should be rendered', async () => {
        const {container} = render(() => (
            <ToggleButtonsSingleTest/>
        ));

        expect(container.querySelectorAll('button').length).toBe(3);
    });

    test('should be active by click', async () => {
        let value: string[] = [];
        const {container} = render(() => (
            <ToggleButtonsSingleTest onChange={e => value = e}/>
        ));

        const [first, second] = Array.from(
            container.querySelectorAll('button')
        );
        const [firstValue, secondValue] = toggleButtons;

        fireEvent.click(first);

        expect(first).toHaveClass('btn-active');
        expect(second).not.toHaveClass('btn-active');
        expect(value).toStrictEqual(firstValue);

        fireEvent.click(second);

        expect(second).toHaveClass('btn-active');
        expect(first).not.toHaveClass('btn-active');
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

        expect(buttons[0]).toHaveClass('btn-active');
        expect(buttons[1]).not.toHaveClass('btn-active');
        cleanup();

        defaultValue = toggleButtons[1];
        result = render(() => (
            <ToggleButtonsSingleTest defaultValue={defaultValue}/>
        ));

        buttons = Array.from(
            result.container.querySelectorAll('button')
        );

        expect(buttons[0]).not.toHaveClass('btn-active');
        expect(buttons[1]).toHaveClass('btn-active');
    });
});
