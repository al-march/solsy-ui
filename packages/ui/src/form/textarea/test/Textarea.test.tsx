import {ObjectKeys} from '../../../utils/object';
import {Textarea, TextareaColors, TextareaSelectors} from '../Textarea';
import {cleanup, fireEvent, render, screen} from '@solidjs/testing-library';

const {TEXTAREA} = TextareaSelectors;

type TextareaClasses = {
  main: string;
  colors: Record<TextareaColors, string>;
};

const addPrefix = (name: string) => `textarea-${name}`;

const classes: TextareaClasses = {
  main: 'textarea',
  colors: {
    accent: addPrefix('accent'),
    primary: addPrefix('primary'),
    secondary: addPrefix('secondary'),
    info: addPrefix('info'),
    success: addPrefix('success'),
    warning: addPrefix('warning'),
    error: addPrefix('error'),
    ghost: addPrefix('ghost'),
  },
};

describe('Textarea', () => {
  it('should be rendered', () => {
    render(() => <Textarea />);
    expect(screen.getByTestId(TEXTAREA)).toBeInTheDocument();
  });
  it('should be bordered', function () {
    render(() => <Textarea bordered />);
    expect(screen.getByTestId(TEXTAREA)).toHaveClass(addPrefix('bordered'));
  });
  it('should set name', function () {
    render(() => <Textarea name="name" />);
    expect(screen.getByTestId(TEXTAREA)).toHaveAttribute('name');
    expect(screen.getByTestId(TEXTAREA).getAttribute('name')).toBe('name');
  });
  it('should set placeholder', function () {
    render(() => <Textarea placeholder="placeholder" />);
    expect(screen.getByTestId(TEXTAREA)).toHaveAttribute('placeholder');
    expect(screen.getByTestId(TEXTAREA).getAttribute('placeholder')).toBe(
      'placeholder'
    );
  });
  it('should be disabled', function () {
    render(() => <Textarea disabled />);
    expect(screen.getByTestId(TEXTAREA)).toBeDisabled();
  });
  it('should set ref', function () {
    let ref: any = null;
    render(() => <Textarea ref={e => (ref = e)} />);
    expect(ref).toBeTruthy();
    expect(ref instanceof HTMLTextAreaElement).toBeTruthy();
  });
  it('should set cols', function () {
    render(() => <Textarea cols={10} />);
    expect(screen.getByTestId(TEXTAREA)).toHaveAttribute('cols');
    expect(screen.getByTestId(TEXTAREA).getAttribute('cols')).toBe('10');
  });
  it('should set rows', function () {
    render(() => <Textarea rows={10} />);
    expect(screen.getByTestId(TEXTAREA)).toHaveAttribute('rows');
    expect(screen.getByTestId(TEXTAREA).getAttribute('rows')).toBe('10');
  });
  it('should emit onInput', function () {
    const onInput = jest.fn();
    render(() => <Textarea onInput={onInput} />);
    fireEvent.input(screen.getByTestId(TEXTAREA));
    expect(onInput).toBeCalled();
  });
  it('should emit onChange', function () {
    const onChange = jest.fn();
    render(() => <Textarea onChange={onChange} />);
    fireEvent.change(screen.getByTestId(TEXTAREA));
    expect(onChange).toBeCalled();
  });
  it('should emit onFocus', function () {
    const onFocus = jest.fn();
    render(() => <Textarea onFocus={onFocus} />);
    fireEvent.focus(screen.getByTestId(TEXTAREA));
    expect(onFocus).toBeCalled();
  });
  it('should emit onBlur', function () {
    const onBlur = jest.fn();
    render(() => <Textarea onBlur={onBlur} />);
    fireEvent.blur(screen.getByTestId(TEXTAREA));
    expect(onBlur).toBeCalled();
  });
  it('should set classes', function () {
    const {colors} = classes;
    ObjectKeys(colors).forEach(color => {
      render(() => <Textarea color={color} />);
      expect(screen.getByTestId(TEXTAREA)).toHaveClass(colors[color]);
      cleanup();
    });
  });
});
