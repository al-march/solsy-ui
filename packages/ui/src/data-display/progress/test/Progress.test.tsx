import {DaisyColors} from '../../../types';
import {Progress, ProgressDefaultProps, ProgressSelectors} from '../Progress';
import {cleanup, render, screen} from '@solidjs/testing-library';

const getProgress = () =>
  screen.getByTestId(ProgressSelectors.PROGRESS) as HTMLProgressElement;

describe('Progress', () => {
  test('should be rendered', () => {
    render(() => <Progress />);
    expect(getProgress()).toBeInTheDocument();
  });
  test('should set colors', () => {
    DaisyColors.forEach(color => {
      render(() => <Progress color={color} />);
      expect(getProgress()).toHaveClass(`progress-${color}`);
      cleanup();
    });
  });
  test('should set custom classes', () => {
    const className = 'custom-class';
    render(() => <Progress class={className} />);
    expect(getProgress()).toHaveClass(className);
  });
  test('should set id', () => {
    const id = 'progress-id';
    render(() => <Progress id={id} />);
    expect(getProgress()).toHaveAttribute('id', id);
  });
  test('should set default props', () => {
    render(() => <Progress />);
    expect(getProgress().value).toBe(ProgressDefaultProps.value);
    expect(getProgress().max).toBe(ProgressDefaultProps.max);
  });
  test('should extract ref', () => {
    let ref: HTMLProgressElement | undefined;
    render(() => <Progress ref={r => (ref = r)} />);
    expect(ref).toBeTruthy();
    expect(ref instanceof HTMLProgressElement).toBeTruthy();
  });
});
