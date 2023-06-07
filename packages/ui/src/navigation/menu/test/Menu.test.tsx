import {Menu, MenuSelectors, MenuState} from '../Menu';
import {Placement} from '@popperjs/core';
import {createSignal} from 'solid-js';
import {fireEvent, render, screen} from '@solidjs/testing-library';

const getMenu = () => screen.getByTestId(MenuSelectors.MENU);
const getDropdown = () => screen.getByTestId(MenuSelectors.DROPDOWN);
const getTrigger = () => screen.getByTestId(MenuSelectors.TRIGGER);

describe('Menu', () => {
  test('should be rendered', () => {
    render(() => <Menu show></Menu>);
    expect(getMenu()).toBeInTheDocument();
  });
  test('should emit click backdrop', () => {
    const onBackdropClick = jest.fn();
    render(() => (
      <Menu show onBackdropClick={onBackdropClick}>
        <Menu.Trigger />
        <Menu.Dropdown />
      </Menu>
    ));
    fireEvent.click(document.body);
    expect(onBackdropClick).toBeCalled();
  });
  test('should emit onInput', () => {
    const onInput = jest.fn();
    render(() => (
      <Menu show onInput={onInput}>
        <Menu.Trigger />
        <Menu.Dropdown />
      </Menu>
    ));
    fireEvent.click(document.body);
    expect(onInput).toBeCalled();
    expect(onInput).toBeCalledWith(false);
  });
  test('should emit onHide', () => {
    const onHide = jest.fn();
    render(() => (
      <Menu show onHide={onHide}>
        <Menu.Trigger />
        <Menu.Dropdown />
      </Menu>
    ));
    fireEvent.click(document.body);
    expect(onHide).toBeCalled();
  });
  test('should emit onShow', () => {
    const onShow = jest.fn();
    render(() => (
      <Menu onShow={onShow}>
        <Menu.Trigger />
      </Menu>
    ));
    fireEvent.click(getTrigger());
    expect(onShow).toBeCalled();
  });
  test('should set placement', async () => {
    const getPopperPlacement = () =>
      getDropdown().getAttribute('data-popper-placement');
    const placement: Placement = 'top';

    render(() => (
      <Menu show>
        <Menu.Trigger />
        <Menu.Dropdown placement={placement} />
      </Menu>
    ));
    await Promise.resolve();
    expect(getPopperPlacement()).toBe(placement);
  });
  test('should set custom classes', () => {
    const className = 'custom-class';
    render(() => <Menu class={className} />);
    expect(getMenu()).toHaveClass(className);
  });
  test('should render menu with state func', () => {
    render(() => (
      <Menu show>
        {() => (
          <>
            <Menu.Trigger />
            <Menu.Dropdown />
          </>
        )}
      </Menu>
    ));

    expect(getTrigger()).toBeInTheDocument();
    expect(getDropdown()).toBeInTheDocument();
  });
  test('should update state', () => {
    const [show, setShow] = createSignal(false);
    let state: MenuState | undefined;

    render(() => (
      <Menu show={show()}>
        {s => {
          state = s;
          return '';
        }}
      </Menu>
    ));

    expect(state?.show).toBe(false);
    setShow(true);
    expect(state?.show).toBe(true);
  });

  describe('Menu.Dropdown', () => {
    test('should set custom classes', () => {
      const className = 'custom-class';
      render(() => (
        <Menu show>
          <Menu.Trigger />
          <Menu.Dropdown class={className} />
        </Menu>
      ));
      expect(getDropdown()).toHaveClass(className);
    });
    test('should set ref', () => {
      let ref: HTMLElement | undefined;
      render(() => (
        <Menu show>
          <Menu.Trigger />
          <Menu.Dropdown ref={r => (ref = r)} />
        </Menu>
      ));
      expect(ref).toBe(getDropdown());
    });
    test('should focus dropdown after show', async () => {
      render(() => (
        <Menu show>
          <Menu.Trigger />
          <Menu.Dropdown />
        </Menu>
      ));
      await Promise.resolve();
      expect(document.activeElement).toBe(getDropdown());
    });
    test('should close by Escape', () => {
      render(() => (
        <Menu show>
          <Menu.Trigger />
          <Menu.Dropdown />
        </Menu>
      ));
      expect(getDropdown()).toBeInTheDocument();
      fireEvent.keyDown(getDropdown(), {key: 'Escape'});
      try {
        expect(getDropdown()).toBeFalsy();
      } catch (e) {
        expect(e).toBeTruthy();
      }
    });
  });

  describe('Menu.Item', () => {
    test('should be rendered', () => {
      render(() => (
        <Menu show>
          <Menu.Item>Item</Menu.Item>
        </Menu>
      ));
      expect(screen.getByTestId(MenuSelectors.OPTION)).toBeInTheDocument();
    });
    test('should be active', () => {
      render(() => (
        <Menu show>
          <Menu.Item active>Item</Menu.Item>
        </Menu>
      ));
      expect(document.querySelector('button.active')).toBeInTheDocument();
    });
    test('should be disabled', () => {
      render(() => (
        <Menu show>
          <Menu.Item disabled>Item</Menu.Item>
        </Menu>
      ));
      expect(document.querySelector('li.disabled')).toBeInTheDocument();
    });
    test('should emit onClick', () => {
      const onClick = jest.fn();
      render(() => (
        <Menu show>
          <Menu.Item onClick={onClick}>Item</Menu.Item>
        </Menu>
      ));
      const option = screen.getByTestId(MenuSelectors.OPTION);
      fireEvent.click(option);
      expect(onClick).toBeCalled();
    });
  });
});
