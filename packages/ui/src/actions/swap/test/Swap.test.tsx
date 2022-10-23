import {Button, ButtonSelectors} from '../../button';
import {Swap, SwapSelectors} from '../Swap';
import {fireEvent, render, screen} from 'solid-testing-library';

const getSwap = () => screen.getByTestId(SwapSelectors.SWAP);
const getSwapOn = () => screen.getByTestId(SwapSelectors.SWAP_ON);
const getSwapOff = () => screen.getByTestId(SwapSelectors.SWAP_OFF);

describe('Swap', () => {
  test('should be render', () => {
    render(() => <Swap />);
    expect(getSwap()).toBeInTheDocument();
  });
  test('should set rotate class', () => {
    render(() => <Swap rotate />);
    expect(getSwap()).toHaveClass('swap-rotate');
  });
  test('should set flip class', () => {
    render(() => <Swap flip />);
    expect(getSwap()).toHaveClass('swap-flip');
  });
  test('should set active class', () => {
    render(() => <Swap isOn />);
    expect(getSwap()).toHaveClass('swap-active');
  });
  test('should set custom class', () => {
    const className = 'custom-class';
    render(() => <Swap class={className} />);
    expect(getSwap()).toHaveClass(className);
  });
  test('should emit onSwap', () => {
    const onSwap = jest.fn();
    render(() => <Swap onSwap={onSwap} />);
    fireEvent.click(getSwap());
    expect(onSwap).toBeCalled();
    expect(onSwap).toBeCalledWith(true);
  });
  test('should be active after toggle', () => {
    render(() => <Swap isOn={false} />);
    expect(getSwap()).not.toHaveClass('swap-active');
    fireEvent.click(getSwap());
    expect(getSwap()).toHaveClass('swap-active');
  });

  const getDynamicButton = () => screen.getByTestId(ButtonSelectors.BUTTON);

  test('should set dynamic component', () => {
    render(() => <Swap as={Button} />);
    expect(getDynamicButton()).toBeInTheDocument();
  });
  test('should set dynamic component props', () => {
    render(() => <Swap as={Button} color="primary" square />);
    expect(getDynamicButton()).toHaveClass('btn-primary');
    expect(getDynamicButton()).toHaveClass('btn-square');
  });

  describe('Swap.Off', () => {
    test('should render', () => {
      render(() => <Swap.Off />);
      expect(getSwapOff()).toBeInTheDocument();
    });
    test('should set custom class', () => {
      const className = 'custom-class';
      render(() => <Swap.Off class={className} />);
      expect(getSwapOff()).toHaveClass(className);
    });
  });

  describe('Swap.On', () => {
    test('should render', () => {
      render(() => <Swap.On />);
      expect(getSwapOn()).toBeInTheDocument();
    });
    test('should set custom class', () => {
      const className = 'custom-class';
      render(() => <Swap.On class={className} />);
      expect(getSwapOn()).toHaveClass(className);
    });
  });
});
