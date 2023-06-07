import {Divider, DividerSelectors} from '../Divider';
import {cleanup, render, screen} from '@solidjs/testing-library';

const ref = () => screen.getByTestId(DividerSelectors.DIVIDER);

describe('Divider', () => {
  test('should render', () => {
    render(() => <Divider />);
    expect(ref()).toBeInTheDocument();
  });
  test('should has orientation', () => {
    render(() => <Divider orientation="vertical" />);
    expect(ref()).toHaveClass('divider-vertical');
    cleanup();
    render(() => <Divider orientation="horizontal" />);
    expect(ref()).toHaveClass('divider-horizontal');
  });
  test('should set custom classes', () => {
    const className = 'class-name';
    render(() => <Divider class={className} />);
    expect(ref()).toHaveClass(className);
  });
});
