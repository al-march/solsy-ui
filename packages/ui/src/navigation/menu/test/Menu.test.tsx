import {Menu, MenuSelectors} from '../Menu';
import {fireEvent, render, screen} from 'solid-testing-library';

describe('Menu', () => {
  test('should be rendered', () => {
    render(() => <Menu isShow />);
    expect(screen.getByTestId(MenuSelectors.MENU)).toBeInTheDocument();
  });
  test('should emit click backdrop', () => {
    const onBackdropClick = jest.fn();
    render(() => <Menu isShow onBackdropClick={onBackdropClick} />);
    fireEvent.click(document.body);
    expect(onBackdropClick).toBeCalled();
  });
});

describe('Menu.Item', () => {
  it('should be rendered', () => {
    render(() => (
      <Menu isShow reference={document.body}>
        <Menu.Item>Item</Menu.Item>
      </Menu>
    ));
    expect(screen.getByTestId(MenuSelectors.OPTION)).toBeInTheDocument();
  });
  it('should be active', () => {
    render(() => (
      <Menu isShow reference={document.body}>
        <Menu.Item active>Item</Menu.Item>
      </Menu>
    ));
    expect(document.querySelector('a.active')).toBeInTheDocument();
  });
  it('should be disabled', () => {
    render(() => (
      <Menu isShow reference={document.body}>
        <Menu.Item disabled>Item</Menu.Item>
      </Menu>
    ));
    expect(document.querySelector('li.disabled')).toBeInTheDocument();
  });
  it('should emit onClick', () => {
    const onClick = jest.fn();
    render(() => (
      <Menu isShow reference={document.body}>
        <Menu.Item onClick={onClick}>Item</Menu.Item>
      </Menu>
    ));
    const option = screen.getByTestId(MenuSelectors.OPTION);
    fireEvent.click(option);
    expect(onClick).toBeCalled();
  });
});
