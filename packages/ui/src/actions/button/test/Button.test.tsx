import { ObjectKeys } from '../../../utils/object';
import { Button, ButtonColor, ButtonSelectors } from '../Button';
import { cleanup, fireEvent, render, screen } from '@solidjs/testing-library';

const {BUTTON} = ButtonSelectors;

describe('Button', () => {
  test('should be rendered', async () => {
    render(() => <Button>button</Button>);
    const component = await screen.getByTestId(BUTTON);
    expect(component).toBeInTheDocument();
    expect(component).toHaveTextContent('button');
  });
  test('should emit onClick', () => {
    const onClick = jest.fn();
    render(() => <Button onClick={onClick}>button</Button>);
    fireEvent.click(screen.getByTestId(BUTTON));
    expect(onClick).toBeCalled();
  });
  test('should emit onFocus', () => {
    const onFocus = jest.fn();
    render(() => <Button onFocus={onFocus}>button</Button>);
    fireEvent.focus(screen.getByTestId(BUTTON));
    expect(onFocus).toBeCalled();
  });
  test('should emit onBlur', () => {
    const onBlur = jest.fn();
    render(() => <Button onBlur={onBlur}>button</Button>);
    fireEvent.blur(screen.getByTestId(BUTTON));
    expect(onBlur).toBeCalled();
  });
  test('should add color classes', async () => {
    const colors: Record<ButtonColor, string> = {
      accent: 'btn-accent',
      error: 'btn-error',
      ghost: 'btn-ghost',
      info: 'btn-info',
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      success: 'btn-success',
      warning: 'btn-warning',
    };
    ObjectKeys(colors).forEach(color => {
      render(() => <Button color={color}>button</Button>);
      expect(screen.getByTestId(BUTTON)).toHaveClass(colors[color]);
      cleanup();
    });

    render(() => <Button link>button</Button>);
    expect(screen.getByTestId(BUTTON)).toHaveClass('btn-link');
  });
  test('should add type classes', async () => {
    render(() => <Button outline>button</Button>);
    expect(screen.getByTestId(BUTTON)).toHaveClass('btn-outline');
    cleanup();

    render(() => <Button active>button</Button>);
    expect(screen.getByTestId(BUTTON)).toHaveClass('btn-active');
    cleanup();

    render(() => <Button disabled>button</Button>);
    expect(screen.getByTestId(BUTTON)).toHaveClass('btn-disabled');
    cleanup();

    render(() => <Button circle>button</Button>);
    expect(screen.getByTestId(BUTTON)).toHaveClass('btn-circle');
    cleanup();

    render(() => <Button square>button</Button>);
    expect(screen.getByTestId(BUTTON)).toHaveClass('btn-square');
    cleanup();

    render(() => <Button loading>button</Button>);
    expect(screen.getByTestId(BUTTON)).toHaveClass('loading');
    cleanup();

    render(() => <Button glass>button</Button>);
    expect(screen.getByTestId(BUTTON)).toHaveClass('glass');
    cleanup();

    render(() => <Button block>button</Button>);
    expect(screen.getByTestId(BUTTON)).toHaveClass('btn-block');
    cleanup();

    render(() => <Button wide>button</Button>);
    expect(screen.getByTestId(BUTTON)).toHaveClass('btn-wide');
    cleanup();

    render(() => <Button noAnimation>button</Button>);
    expect(screen.getByTestId(BUTTON)).toHaveClass('no-animation');
    cleanup();
  });
  test('should add custom classes', async () => {
    render(() => <Button class="my-custom-class">button</Button>);
    expect(await screen.findByText('button')).toHaveClass('my-custom-class');
  });
  test('should disable button', async () => {
    render(() => <Button disabled>button</Button>);
    expect(await screen.findByText('button')).toBeDisabled();
    expect(await screen.findByText('button')).toHaveClass('btn-disabled');
  });
  test('should set type', () => {
    const types: Array<'button' | 'submit' | 'reset' | undefined> = [
      undefined,
      'button',
      'submit',
      'reset',
    ];
    types.forEach(type => {
      render(() => <Button type={type}>button</Button>);
      expect(screen.getByTestId(BUTTON)).toHaveAttribute('type', type);
      cleanup();
    });
  });
});
