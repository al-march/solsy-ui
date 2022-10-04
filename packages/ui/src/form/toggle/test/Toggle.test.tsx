import {ObjectKeys} from '../../../utils/object';
import {Toggle, ToggleColor, ToggleSelectors, ToggleSize} from '../Toggle';
import {createSignal} from 'solid-js';
import {cleanup, fireEvent, render, screen} from 'solid-testing-library';

const {INPUT} = ToggleSelectors;

const toggleRef = () => screen.getByTestId(INPUT);

type ToggleClasses = {
  main: string;
  colors: Record<ToggleColor, string>;
  sizes: Record<ToggleSize, string>;
};

const addPrefix = (name: string) => `toggle-${name}`;

const classes: ToggleClasses = {
  main: 'toggle',
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
  },
};

describe('Toggle', () => {
  test('should be rendered', () => {
    render(() => <Toggle />);
    expect(toggleRef()).toBeInTheDocument();
  });
  test('should be checked', () => {
    render(() => <Toggle value={true} />);
    expect(toggleRef()).toBeChecked();
  });
  test('should set name attribute', () => {
    const name = 'name';
    render(() => <Toggle name={name} />);
    expect(toggleRef()).toHaveAttribute('name', name);
  });
  test('should set id attribute', () => {
    const id = 'id';
    render(() => <Toggle id={id} />);
    expect(toggleRef()).toHaveAttribute('id', id);
  });
  test('should update value by prop', () => {
    const [value, setValue] = createSignal(false);
    render(() => <Toggle indeterminate value={value()} />);

    const input = toggleRef() as HTMLInputElement;
    expect(input).not.toBeChecked();
    setValue(true);
    expect(input).toBeChecked();
  });
  test('should emit onInput', () => {
    const onInput = jest.fn();
    render(() => <Toggle onInput={onInput} />);
    const input = toggleRef();
    fireEvent.input(input);
    expect(onInput).toBeCalled();
  });
  test('should emit onChange', () => {
    const onChange = jest.fn();
    render(() => <Toggle onChange={onChange} />);
    const input = toggleRef();
    fireEvent.change(input);
    expect(onChange).toBeCalled();
  });
  test('should be checked by click', () => {
    render(() => <Toggle value={false} />);
    const input = toggleRef();
    fireEvent.click(input);
    expect(input).toBeChecked();
  });
  test('should be indeterminate', () => {
    render(() => <Toggle indeterminate />);
    const input = toggleRef();
    expect((input as HTMLInputElement).indeterminate).toBeTruthy();
  });
  test('should update indeterminate by prop', () => {
    const [indeterminate, setIndeterminate] = createSignal(false);
    render(() => <Toggle indeterminate={indeterminate()} />);
    const input = toggleRef() as HTMLInputElement;

    expect(input.indeterminate).toBeFalsy();
    setIndeterminate(true);
    expect(input.indeterminate).toBeTruthy();
  });
  test('should set color classes', () => {
    const {colors} = classes;
    ObjectKeys(colors).forEach(color => {
      render(() => <Toggle color={color} />);
      expect(toggleRef()).toHaveClass(colors[color]);
      cleanup();
    });
  });
  test('should set size classes', () => {
    const {sizes} = classes;
    ObjectKeys(sizes).forEach(size => {
      render(() => <Toggle size={size} />);
      expect(toggleRef()).toHaveClass(sizes[size]);
      cleanup();
    });
  });
  test('should set custom classes', () => {
    const className = 'custom-class';
    render(() => <Toggle class={className} />);
    expect(toggleRef()).toHaveClass(className);
  });
  test('should set ref', () => {
    let ref: HTMLInputElement | undefined;
    render(() => <Toggle ref={r => (ref = r)} />);
    expect(ref instanceof HTMLInputElement).toBeTruthy();
  });
});
