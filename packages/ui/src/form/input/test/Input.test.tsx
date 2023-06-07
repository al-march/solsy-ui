import {ObjectKeys} from '../../../utils/object';
import {Input, InputColor, InputSelectors, InputSize} from '../Input';
import {cleanup, fireEvent, render, screen} from '@solidjs/testing-library';

const {INPUT} = InputSelectors;

describe('Input', () => {
  test('should be rendered', () => {
    render(() => <Input />);
    expect(screen.getByTestId(INPUT)).toBeInTheDocument();
  });

  test('should set value', () => {
    const value = '10';
    render(() => <Input value={value} />);
    expect(screen.getByTestId(INPUT)).toHaveValue(value);
  });

  test('should set placeholder', () => {
    const placeholder = 'placeholder';
    render(() => <Input placeholder={placeholder} />);
    expect(screen.getByTestId(INPUT)).toHaveAttribute(
      'placeholder',
      placeholder
    );
  });

  test('should set type', () => {
    const type = 'text';
    render(() => <Input type={type} />);
    expect(screen.getByTestId(INPUT)).toHaveAttribute('type', type);
  });

  test('should set name', () => {
    const name = 'name';
    render(() => <Input name={name} />);
    expect(screen.getByTestId(INPUT)).toHaveAttribute('name', name);
  });

  test('should set autocomplete', () => {
    const autocomplete = 'autocomplete';
    render(() => <Input autocomplete={autocomplete} />);
    expect(screen.getByTestId(INPUT)).toHaveAttribute(
      'autocomplete',
      autocomplete
    );
  });

  test('should disable input', () => {
    render(() => <Input disabled />);
    expect(screen.getByTestId(INPUT)).toBeDisabled();
  });

  test('should emit onInput', () => {
    const onInput = jest.fn();
    render(() => <Input onInput={onInput} />);
    fireEvent.input(screen.getByTestId(INPUT));
    expect(onInput).toBeCalled();
  });

  test('should emit onChange', () => {
    const onChange = jest.fn();
    render(() => <Input onChange={onChange} />);
    fireEvent.change(screen.getByTestId(INPUT));
    expect(onChange).toBeCalled();
  });

  test('should emit onFocus', () => {
    const onFocus = jest.fn();
    render(() => <Input onFocus={onFocus} />);
    fireEvent.focus(screen.getByTestId(INPUT));
    expect(onFocus).toBeCalled();
  });

  test('should emit onBlur', () => {
    const onBlur = jest.fn();
    render(() => <Input onBlur={onBlur} />);
    fireEvent.blur(screen.getByTestId(INPUT));
    expect(onBlur).toBeCalled();
  });

  test('should be bordered', () => {
    render(() => <Input bordered />);
    expect(screen.getByTestId(INPUT)).toHaveClass('input-bordered');
  });

  test('should set size classes', () => {
    const sizes: Record<InputSize, string> = {
      lg: 'input-lg',
      md: 'input-md',
      sm: 'input-sm',
      xs: 'input-xs',
    };

    ObjectKeys(sizes).forEach(size => {
      render(() => <Input size={size} />);
      expect(screen.getByTestId(INPUT)).toHaveClass(sizes[size]);
      cleanup();
    });
  });

  test('should set color classes', () => {
    const colors: Record<InputColor, string> = {
      accent: 'input-accent',
      error: 'input-error',
      ghost: 'input-ghost',
      info: 'input-info',
      primary: 'input-primary',
      secondary: 'input-secondary',
      success: 'input-success',
      warning: 'input-warning',
    };

    ObjectKeys(colors).forEach(color => {
      render(() => <Input color={color} />);
      expect(screen.getByTestId(INPUT)).toHaveClass(colors[color]);
      cleanup();
    });
  });

  test('should set custom class', () => {
    const className = 'custom-class';
    render(() => <Input class={className} />);
    expect(screen.getByTestId(INPUT)).toHaveClass(className);
  });
});
