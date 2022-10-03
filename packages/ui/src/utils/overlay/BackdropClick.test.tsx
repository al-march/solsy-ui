import {BackdropClick, BackdropClickSelectors} from './BackdropClick';
import {createSignal} from 'solid-js';
import {cleanup, fireEvent, render, screen} from 'solid-testing-library';

const {CLICKER} = BackdropClickSelectors;

describe('BackdropClick', () => {
  test('should be rendered', () => {
    const text = 'BackdropClicker component';
    render(() => (
      <BackdropClick>
        <div>{text}</div>
      </BackdropClick>
    ));

    const clicker = screen.getByTestId(CLICKER);
    expect(clicker).toBeInTheDocument();
    expect(clicker).toHaveTextContent(text);
  });

  test('should emit backdrop click', () => {
    const onClick = jest.fn();
    render(() => (
      <BackdropClick onBackdropClick={onClick}>
        <div>BackdropClicker component</div>
      </BackdropClick>
    ));

    fireEvent.click(document.body);
    expect(onClick).toBeCalled();
  });

  test('should emit content click', () => {
    const onClick = jest.fn();
    const [ref, setRef] = createSignal<HTMLElement>();
    render(() => (
      <BackdropClick onContentClick={onClick}>
        <div ref={setRef}>BackdropClicker component</div>
      </BackdropClick>
    ));

    const content = ref();
    if (content) {
      fireEvent.click(content);
    } else {
      fail('Content ref not found');
    }

    expect(onClick).toBeCalled();
  });

  test('should emitted with event', () => {
    let event: Event | undefined;
    render(() => (
      <BackdropClick
        onBackdropClick={e => (event = e)}
        onContentClick={e => (event = e)}
      >
        <div>BackdropClicker component</div>
      </BackdropClick>
    ));
    fireEvent.click(document.body);
    expect(event instanceof Event).toBeTruthy();

    event = undefined;

    fireEvent.click(screen.getByTestId(CLICKER));
    if (event) {
      expect((event as Event) instanceof Event).toBeTruthy();
    } else {
      fail('Backdrop content click emit without event');
    }
  });

  test('should remove listener after destroy', () => {
    const onClick = jest.fn();

    render(() => <BackdropClick onBackdropClick={onClick} />);
    cleanup();
    render(() => <BackdropClick onBackdropClick={onClick} />);

    fireEvent.click(document.body);
    expect(onClick).toBeCalledTimes(1);
  });

  test('should set custom class', () => {
    const className = 'custom-class';
    render(() => <BackdropClick class={className} />);
    expect(screen.getByTestId(CLICKER)).toHaveClass(className);
  });
});
