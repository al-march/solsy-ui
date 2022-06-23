import { For } from 'solid-js';
import { cleanup, fireEvent, render, screen } from 'solid-testing-library';
import { BtnGroupSelectors, BtnGroupSize, BtnGroup } from '../BtnGroup';
import { ObjectKeys } from '../../../utils/object';

const toggleButtons = ['first', 'second', 'third'];

const isButtonActive = (button: HTMLElement) => (
  button.classList.contains('btn-active')
);

describe('ToggleButtons', () => {
  test('should be rendered', async () => {
    render(() => (
      <BtnGroup>
        <For each={toggleButtons}>
          {(btn) => <BtnGroup.Item value={btn}>{btn}</BtnGroup.Item>}
        </For>
      </BtnGroup>
    ));

    expect(screen.getAllByTestId(BtnGroupSelectors.BUTTON).length).toBe(3);
  });
  test('should set size classes', () => {
    const sizes: Record<BtnGroupSize, string> = {
      lg: 'btn-lg',
      md: 'btn-md',
      sm: 'btn-sm',
      xs: 'btn-xs'
    };

    ObjectKeys(sizes).forEach(size => {
      render(() => (
        <BtnGroup size={size}>
          <For each={toggleButtons}>
            {(btn) => <BtnGroup.Item value={btn}>{btn}</BtnGroup.Item>}
          </For>
        </BtnGroup>
      ));
      screen.getAllByTestId(BtnGroupSelectors.BUTTON).forEach(button => {
        expect(button).toHaveClass(sizes[size]);
      });
      cleanup();
    });
  });
  test('should be active by click', async () => {
    let value = '';
    render(() => (
      <BtnGroup<string> onInput={e => value = e}>
        <For each={toggleButtons}>
          {(btn) => <BtnGroup.Item value={btn}>{btn}</BtnGroup.Item>}
        </For>
      </BtnGroup>
    ));

    const [first, second] = screen.getAllByTestId(BtnGroupSelectors.BUTTON);
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
      <BtnGroup value={value}>
        <For each={toggleButtons}>
          {(btn) => <BtnGroup.Item value={btn}>{btn}</BtnGroup.Item>}
        </For>
      </BtnGroup>
    ));

    let buttons = screen.getAllByTestId(BtnGroupSelectors.BUTTON);

    expect(isButtonActive(buttons[0])).toBeTruthy();
    expect(isButtonActive(buttons[1])).toBeFalsy();
    cleanup();

    value = toggleButtons[1];
    render(() => (
      <BtnGroup value={value}>
        <For each={toggleButtons}>
          {(btn) => <BtnGroup.Item value={btn}>{btn}</BtnGroup.Item>}
        </For>
      </BtnGroup>
    ));

    buttons = screen.getAllByTestId(BtnGroupSelectors.BUTTON);

    expect(isButtonActive(buttons[0])).not.toBeTruthy();
    expect(isButtonActive(buttons[1])).toBeTruthy();
  });
  test('should set index without defaultValue on button', () => {
    render(() => (
      <BtnGroup value={2}>
        <For each={toggleButtons}>
          {(btn) => <BtnGroup.Item>{btn}</BtnGroup.Item>}
        </For>
      </BtnGroup>
    ));

    const buttons = screen.getAllByTestId(BtnGroupSelectors.BUTTON);
    const last = buttons[2];
    expect(isButtonActive(last)).toBeTruthy();
  });
  test('should toggle', async () => {
    render(() => (
      <BtnGroup multiple>
        <For each={toggleButtons}>
          {(btn) => <BtnGroup.Item>{btn}</BtnGroup.Item>}
        </For>
      </BtnGroup>
    ));

    const [button] = screen.getAllByTestId(BtnGroupSelectors.BUTTON);

    fireEvent.click(button);
    expect(isButtonActive(button)).toBeTruthy();
    fireEvent.click(button);
    expect(isButtonActive(button)).not.toBeTruthy();
  });
  test('should return a list', () => {
    let value: string[] = [];
    render(() => (
      <BtnGroup<string[]>
        multiple
        onInput={e => value = e}
      >
        <For each={toggleButtons}>
          {(btn) => <BtnGroup.Item value={btn}>{btn}</BtnGroup.Item>}
        </For>
      </BtnGroup>
    ));

    const buttons = screen.getAllByTestId(BtnGroupSelectors.BUTTON);
    const [firstBtn, secondBtn] = buttons;

    fireEvent.click(firstBtn);
    fireEvent.click(secondBtn);

    expect(value).toStrictEqual([toggleButtons[0], toggleButtons[1]]);
  });
  test('should checked buttons by default value', () => {
    const defaultValues = [...toggleButtons];
    render(() => (
      <BtnGroup
        multiple
        value={defaultValues}
      >
        <For each={toggleButtons}>
          {(btn) => <BtnGroup.Item value={btn}>{btn}</BtnGroup.Item>}
        </For>
      </BtnGroup>
    ));

    screen.getAllByTestId(BtnGroupSelectors.BUTTON).forEach(button => {
      expect(isButtonActive(button)).toBeTruthy();
    });
  });
});
