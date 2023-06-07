import {ObjectKeys} from '../../../utils/object';
import {
  Checkbox,
  CheckboxColor,
  CheckboxSelectors,
  CheckboxSize,
} from '../Checkbox';
import {createSignal} from 'solid-js';
import {cleanup, fireEvent, render, screen} from '@solidjs/testing-library';

type CheckboxClasses = {
  main: string;
  colors: Record<CheckboxColor, string>;
  sizes: Record<CheckboxSize, string>;
  addPrefix: (name: string) => string;
};

const addPrefix = (name: string) => `checkbox-${name}`;

const classes: CheckboxClasses = {
  main: 'checkbox',
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
  addPrefix(name: string) {
    return `${this.main}-${name}`;
  },
};

const {CHECKBOX} = CheckboxSelectors;

describe('Checkbox', () => {
  test('should be rendered', () => {
    render(() => <Checkbox />);
    const checkbox = screen.getByTestId(CHECKBOX);
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveClass(classes.main);
  });

  test('should set value', () => {
    const value = 'true';
    render(() => <Checkbox value={value} />);
    expect(screen.getByTestId(CHECKBOX)).toBeChecked();
  });

  test('should emit onInput event', () => {
    const onInput = jest.fn();
    render(() => <Checkbox onInput={onInput} />);
    const checkbox = screen.getByTestId(CHECKBOX);
    fireEvent.input(checkbox);
    expect(onInput).toBeCalled();
  });

  test('should emit onChange event', () => {
    const onChange = jest.fn();
    render(() => <Checkbox onChange={onChange} />);
    const checkbox = screen.getByTestId(CHECKBOX);
    fireEvent.change(checkbox);
    expect(onChange).toBeCalled();
  });

  test('should emit onFocus event', () => {
    const onFocus = jest.fn();
    render(() => <Checkbox onFocus={onFocus} />);
    const checkbox = screen.getByTestId(CHECKBOX);
    fireEvent.focus(checkbox);
    expect(onFocus).toBeCalled();
  });

  test('should emit onBlur event', () => {
    const onBlur = jest.fn();
    render(() => <Checkbox onBlur={onBlur} />);
    const checkbox = screen.getByTestId(CHECKBOX);
    fireEvent.blur(checkbox);
    expect(onBlur).toBeCalled();
  });

  test('should set color classes', () => {
    const {colors} = classes;
    ObjectKeys(colors).forEach(color => {
      render(() => <Checkbox color={color} />);
      expect(screen.getByTestId(CHECKBOX)).toHaveClass(colors[color]);
      cleanup();
    });
  });

  test('should set size classes', () => {
    const {sizes} = classes;
    ObjectKeys(sizes).forEach(size => {
      render(() => <Checkbox size={size} />);
      expect(screen.getByTestId(CHECKBOX)).toHaveClass(sizes[size]);
      cleanup();
    });
  });

  test('should set custom classes', () => {
    const className = 'custom-class';
    render(() => <Checkbox class={className} />);
    expect(screen.getByTestId(CHECKBOX)).toHaveClass(className);
  });

  test('should be indeterminate', () => {
    render(() => <Checkbox indeterminate />);
    const input = screen.getByTestId(CHECKBOX);
    expect((input as HTMLInputElement).indeterminate).toBeTruthy();
  });

  test('should update indeterminate by prop', () => {
    const [indeterminate, setIndeterminate] = createSignal(false);
    render(() => <Checkbox indeterminate={indeterminate()} />);
    const input = screen.getByTestId(CHECKBOX) as HTMLInputElement;

    expect(input.indeterminate).toBeFalsy();
    setIndeterminate(true);
    expect(input.indeterminate).toBeTruthy();
  });
});
