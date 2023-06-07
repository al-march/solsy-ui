import {ObjectKeys} from '../../../utils/object';
import {Alert, AlertSelectors} from '../Alert';
import {AlertType} from '../types';
import {cleanup, fireEvent, render, screen} from '@solidjs/testing-library';

const {ALERT, DEFAULT_ACTION, CUSTOM_ACTION, CLOSE_BTN} = AlertSelectors;

const alertRef = () => screen.getByTestId(ALERT);
const defaultActionRef = () => screen.getByTestId(DEFAULT_ACTION);
const customActionRef = () => screen.getByTestId(CUSTOM_ACTION);
const closeBtnRef = () => screen.getByTestId(CLOSE_BTN);

type Classes = {
  main: string;
  colors: Record<AlertType, string>;
};

const addPrefix = (name: string) => `alert-${name}`;

export const classes: Classes = {
  main: 'alert',
  colors: {
    info: addPrefix('info'),
    success: addPrefix('success'),
    warning: addPrefix('warning'),
    error: addPrefix('error'),
  },
};

describe('Alert', () => {
  test('should render', () => {
    render(() => <Alert />);
    expect(alertRef()).toBeInTheDocument();
  });
  test('should set color classes', () => {
    const {colors} = classes;
    ObjectKeys(colors).forEach(color => {
      render(() => <Alert type={color} />);
      expect(alertRef()).toHaveClass(colors[color]);
      cleanup();
    });
  });
  test('should set custom classes', () => {
    const classes = 'custom classes';
    render(() => <Alert class={classes} />);
    expect(alertRef()).toHaveClass(classes);
  });
  test('should not be action', () => {
    render(() => <Alert />);
    try {
      expect(defaultActionRef());
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
  test('should be default action', () => {
    render(() => <Alert action />);
    expect(defaultActionRef()).toBeInTheDocument();
  });
  test('should be custom action', () => {
    render(() => <Alert action={'action'} />);
    expect(customActionRef()).toBeInTheDocument();
  });
  test('should emit onClose', () => {
    const onClose = jest.fn();
    render(() => <Alert onClose={onClose} action />);
    fireEvent.click(closeBtnRef());
    expect(onClose).toBeCalled();
  });
  test('should emit onAction', () => {
    const onAction = jest.fn();
    render(() => <Alert onAction={onAction} action={'action'} />);
    fireEvent.click(customActionRef());
    expect(onAction).toBeCalled();
  });
});
