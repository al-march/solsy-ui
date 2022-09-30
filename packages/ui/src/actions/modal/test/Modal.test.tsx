import { Modal, ModalProps, ModalSelectors } from '../Modal';
import { Component, createSignal } from 'solid-js';
import { fireEvent, render, screen } from 'solid-testing-library';

const ModalTest: Component<ModalProps> = props => {
  const [show, setShow] = createSignal(props.isShow);
  const toggle = () => setShow(!show());
  let closeButton: HTMLButtonElement | undefined;

  return (
    <>
      <button data-testid="modal-btn" onClick={toggle}>
        btn
      </button>
      <Modal
        isShow={show()}
        onBackdropClick={toggle}
        onClose={props.onClose}
        trigger={closeButton}
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

const btn = () => screen.getByTestId('modal-btn');
const content = () => screen.getByTestId('modal-content');

describe('Modal', () => {
  test('should be rendered', async () => {
    await render(() => <ModalTest isShow={true}/>);
    expect(await content()).toBeInTheDocument();
  });

  test('should be rendered by btn click', async () => {
    await render(() => <ModalTest isShow={false}/>);
    await screen.findByTestId('modal-content').catch(err => {
      expect(err).toBeTruthy();
    });

    fireEvent.click(await btn());
    expect(await content()).toBeInTheDocument();
  });

  test('should be closed after backdrop clicked', async () => {
    const content = () => screen.findByTestId('modal-content')

    render(() => <ModalTest isShow={true}/>);
    expect(await content()).toBeInTheDocument();
    fireEvent.click(document.body);

    content().catch(err => {
      expect(err).toBeTruthy();
    });
  });

  test('should add custom classes', () => {
    const customClass = 'custom-modal-class';

    render(() => (
      <Modal isShow={true} class={customClass}>
        <h3>test classes</h3>
      </Modal>
    ));

    expect(document.body.querySelector(`.${customClass}`)).toBeInTheDocument();
  });

  test('should emit onClose', async () => {
    const onClose = jest.fn();
    render(() => <ModalTest isShow={true} onClose={onClose}/>);

    fireEvent.click(screen.getByTestId('close-modal-btn'));
    await Promise.resolve();
    expect(onClose).toBeCalled();
  });

  test('should emit onBackdropClick', () => {
    const onBackdropClick = jest.fn();
    render(() => (
      <Modal isShow={true} onBackdropClick={onBackdropClick}>
        <h3>test classes</h3>
      </Modal>
    ));

    fireEvent.click(screen.getByTestId(ModalSelectors.BACKDROP));
    expect(onBackdropClick).toBeCalled();
  });

  test('should focused on show', async () => {
    await render(() => <ModalTest isShow={false}/>);
    fireEvent.click(await btn());

    setTimeout(() => {
      expect(content()).toHaveFocus();
    })
  });

  test('should focused on trigger after closing', async () => {
    await render(() => <ModalTest isShow={true}/>);
    fireEvent.click(screen.getByTestId('close-modal-btn'));

    setTimeout(() => {
      expect(btn()).toHaveFocus();
    })
  });

  test('should closed by ESC', async () => {
    const content = () => screen.findByTestId('modal-content')

    await render(() => <ModalTest isShow={true}/>);
    fireEvent.keyDown(await content(), {key: 'Escape'});

    await content().catch(err => {
      expect(err).toBeTruthy();
    });
  });
});
