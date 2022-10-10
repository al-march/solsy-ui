import {tick} from '../../../utils/test/tick';
import {Dropdown, DropdownSelectors} from '../Dropdown';
import {createSignal} from 'solid-js';
import {fireEvent, render, screen} from 'solid-testing-library';

const getDropdown = () => screen.getByTestId(DropdownSelectors.DROPDOWN);

describe('Menu', () => {
  test('should be rendered', () => {
    render(() => <Dropdown show />);
    expect(getDropdown()).toBeInTheDocument();
  });
  test('should set ref', () => {
    let ref: HTMLElement | undefined;
    render(() => <Dropdown show ref={el => (ref = el)} />);
    expect(ref).toBeTruthy();
  });
  test('should set custom classes', () => {
    const className = 'custom-class';
    render(() => <Dropdown show class={className} />);
    expect(getDropdown()).toHaveClass(className);
  });
  test('should emit onShowEnd', async () => {
    const [show, setShow] = createSignal(false);
    const onShowEnd = jest.fn();
    render(() => <Dropdown show={show()} onShowEnd={onShowEnd} />);

    setShow(true);
    await tick(50);
    expect(onShowEnd).toBeCalled();
  });
  test('should emit onHideEnd', async () => {
    const [show, setShow] = createSignal(true);
    const onHideEnd = jest.fn();
    render(() => <Dropdown show={show()} onHideEnd={onHideEnd} />);

    setShow(false);
    await tick(50);
    expect(onHideEnd).toBeCalled();
  });
  test('should emit click backdrop', () => {
    const onBackdropClick = jest.fn();
    render(() => <Dropdown show onBackdropClick={onBackdropClick} />);
    fireEvent.click(document.body);
    expect(onBackdropClick).toBeCalled();
  });
});
