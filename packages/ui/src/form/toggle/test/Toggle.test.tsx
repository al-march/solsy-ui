import {ObjectKeys} from '../../../utils/object';
import {Toggle, ToggleColor, ToggleSelectors, ToggleSize} from '../Toggle';
import {createSignal} from 'solid-js';
import {cleanup, fireEvent, render, screen} from 'solid-testing-library';

const {INPUT} = ToggleSelectors;

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
    expect(screen.getByTestId(INPUT)).toBeInTheDocument();
  });

  test('should be checked', () => {
    render(() => <Toggle value={true} />);
    expect(screen.getByTestId(INPUT)).toBeChecked();
  });

  test('should update value by prop', () => {
    const [value, setValue] = createSignal(false);
    render(() => <Toggle indeterminate value={value()} />);

    const input = screen.getByTestId(INPUT) as HTMLInputElement;
    expect(input).not.toBeChecked();
    setValue(true);
    expect(input).toBeChecked();
  });

  test('should emit onInput', () => {
    const onInput = jest.fn();
    render(() => <Toggle onInput={onInput} />);
    const input = screen.getByTestId(INPUT);
    fireEvent.input(input);
    expect(onInput).toBeCalled();
  });

  test('should emit onChange', () => {
    const onChange = jest.fn();
    render(() => <Toggle onChange={onChange} />);
    const input = screen.getByTestId(INPUT);
    fireEvent.change(input);
    expect(onChange).toBeCalled();
  });

  test('should be checked by click', () => {
    render(() => <Toggle value={false} />);
    const input = screen.getByTestId(INPUT);
    fireEvent.click(input);
    expect(input).toBeChecked();
  });

  test('should be indeterminate', () => {
    render(() => <Toggle indeterminate />);
    const input = screen.getByTestId(INPUT);
    expect((input as HTMLInputElement).indeterminate).toBeTruthy();
  });

  test('should update indeterminate by prop', () => {
    const [indeterminate, setIndeterminate] = createSignal(false);
    render(() => <Toggle indeterminate={indeterminate()} />);
    const input = screen.getByTestId(INPUT) as HTMLInputElement;

    expect(input.indeterminate).toBeFalsy();
    setIndeterminate(true);
    expect(input.indeterminate).toBeTruthy();
  });

  test('should set color classes', () => {
    const {colors} = classes;
    ObjectKeys(colors).forEach(color => {
      render(() => <Toggle color={color} />);
      expect(screen.getByTestId(INPUT)).toHaveClass(colors[color]);
      cleanup();
    });
  });

  test('should set size classes', () => {
    const {sizes} = classes;
    ObjectKeys(sizes).forEach(size => {
      render(() => <Toggle size={size} />);
      expect(screen.getByTestId(INPUT)).toHaveClass(sizes[size]);
      cleanup();
    });
  });

  test('should set custom classes', () => {
    const className = 'custom-class';
    render(() => <Toggle class={className} />);
    expect(screen.getByTestId(INPUT)).toHaveClass(className);
  });
});
