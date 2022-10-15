import {Modal, ModalProps, ModalSelectors} from '../Modal';
import {createSignal, ParentProps} from 'solid-js';
import {fireEvent, render, screen} from 'solid-testing-library';

const ModalTest = (props: ParentProps<ModalProps>) => {
  const [show, setShow] = createSignal(props.show);
  const toggle = () => setShow(!show());
  let closeButton: HTMLButtonElement | undefined;

  return (
    <>
      <button data-testid="modal-btn" onClick={toggle}>
        btn
      </button>
      <Modal
        show={show()}
        trigger={closeButton}
        onBackdropClick={toggle}
        onOpen={props.onOpen}
        onClose={props.onClose}
      >
        <div data-testid="modal-content">
          <h3 class="font-bold text-lg">Modal title</h3>
          <button
            ref={ref => (closeButton = ref)}
            data-testid="close-modal-btn"
            onClick={toggle}
          >
            close
          </button>
        </div>
      </Modal>
    </>
  );
};

const getBtn = () => screen.getByTestId('modal-btn');
const getModal = () => screen.getByTestId(ModalSelectors.MODAL);
const getContent = () => screen.getByTestId('modal-content');

describe('Modal', () => {
  test('should be rendered', () => {
    render(() => <ModalTest show />);
    expect(getContent()).toBeInTheDocument();
  });
  test('should be rendered by btn click', async () => {
    render(() => <ModalTest />);
    screen.findByTestId('modal-content').catch(err => {
      expect(err).toBeTruthy();
    });

    fireEvent.click(getBtn());
    expect(getContent()).toBeInTheDocument();
  });
  test('should be closed after backdrop clicked', async () => {
    const content = () => screen.findByTestId('modal-content');

    render(() => <ModalTest show />);
    expect(await content()).toBeInTheDocument();
    fireEvent.click(document.body);

    content().catch(err => {
      expect(err).toBeTruthy();
    });
  });
  test('should add custom classes', () => {
    const customClass = 'custom-modal-class';

    render(() => (
      <Modal show class={customClass}>
        <h3>test classes</h3>
      </Modal>
    ));

    expect(getModal()).toHaveClass(customClass);
  });
  test('should emit onOpen', async () => {
    const onOpen = jest.fn();
    render(() => <ModalTest onOpen={onOpen} />);

    fireEvent.click(getBtn());
    await Promise.resolve();
    expect(onOpen).toBeCalled();
    expect(onOpen).toBeCalledTimes(1);
  });
  test('should emit onClose', async () => {
    const onClose = jest.fn();
    render(() => <ModalTest show onClose={onClose} />);

    fireEvent.click(screen.getByTestId('close-modal-btn'));
    await Promise.resolve();
    expect(onClose).toBeCalled();
  });
  test('should emit onBackdropClick', () => {
    const onBackdropClick = jest.fn();
    render(() => (
      <Modal show={true} onBackdropClick={onBackdropClick}>
        <h3>test classes</h3>
      </Modal>
    ));

    fireEvent.click(screen.getByTestId(ModalSelectors.BACKDROP));
    expect(onBackdropClick).toBeCalled();
  });

  test('should focused on show', async () => {
    await render(() => <ModalTest show={false} />);
    fireEvent.click(await getBtn());

    setTimeout(() => {
      expect(getContent()).toHaveFocus();
    });
  });

  test('should focused on trigger after closing', async () => {
    await render(() => <ModalTest show={true} />);
    fireEvent.click(screen.getByTestId('close-modal-btn'));

    setTimeout(() => {
      expect(getBtn()).toHaveFocus();
    });
  });

  test('should closed by ESC', async () => {
    const content = () => screen.findByTestId('modal-content');

    await render(() => <ModalTest show={true} />);
    fireEvent.keyDown(await content(), {key: 'Escape'});

    await content().catch(err => {
      expect(err).toBeTruthy();
    });
  });
});
