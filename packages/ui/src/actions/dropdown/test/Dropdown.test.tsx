import {tick} from '../../../utils/test/tick';
import {Dropdown, DropdownSelectors} from '../Dropdown';
import {createSignal} from 'solid-js';
import {fireEvent, render, screen} from 'solid-testing-library';

const getDropdown = () => screen.getByTestId(DropdownSelectors.DROPDOWN);

describe('Dropdown', () => {
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
  test('should set classList', () => {
    const className = 'custom-class';
    render(() => <Dropdown show classList={{[className]: true}} />);
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
  test('should emit DOM events', () => {
    const DOMEvents = {
      onClick: jest.fn(),
      onFocus: jest.fn(),
      onBlur: jest.fn(),
      onKeyDown: jest.fn(),
    };

    render(() => <Dropdown show {...DOMEvents} />);
    // Click
    fireEvent.click(getDropdown());
    expect(DOMEvents.onClick).toBeCalled();
    // Focus
    fireEvent.focus(getDropdown());
    expect(DOMEvents.onFocus).toBeCalled();
    // Blur
    fireEvent.blur(getDropdown());
    expect(DOMEvents.onBlur).toBeCalled();
    // KeyDown
    fireEvent.keyDown(getDropdown(), {key: 'Escape'});
    expect(DOMEvents.onKeyDown).toBeCalled();
  });
});
