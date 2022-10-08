import {Page} from '@page/base';
import {Code, ImportPreview} from '@shared/components';
import {Button, Modal, ModalAction} from '@ui/actions';
import {Divider} from '@ui/layout';
import {Component, createSignal} from 'solid-js';

const modalSnippet = `export const ModalExample = () => {
  const [show, setShow] = createSignal(false);
  const toggleModal = () => setShow(!show());

  return (
    <>
      <Button color="primary" onClick={toggleModal}>
        Open
      </Button>

      <Modal isShow={show()} onBackdropClick={toggleModal}>
        <h3 class="font-bold text-2xl">Modal title</h3>
        <Divider />
        <p>Modal description</p>
        <ModalAction>
          <Button onClick={toggleModal}>Yay!</Button>
        </ModalAction>
      </Modal>
    </>
  );
};`;

export const ModalPage: Component = () => {
  const [show, setShow] = createSignal(false);
  let closeButton;

  function toggleModal() {
    setShow(!show());
  }

  return (
    <Page full class="p-4">
      <h2 class="text-2xl">Modals</h2>

      <br />
      <ImportPreview component="Modal" />
      <br />

      <Button
        ref={ref => (closeButton = ref)}
        color="primary"
        onClick={toggleModal}
      >
        Open
      </Button>

      <Code>{modalSnippet}</Code>

      <Modal
        isShow={show()}
        onBackdropClick={toggleModal}
        trigger={closeButton}
      >
        <h3 class="font-bold text-2xl">Modal title</h3>
        <Divider />
        <p>Modal description</p>
        <ModalAction>
          <Button onClick={toggleModal}>Yay!</Button>
        </ModalAction>
      </Modal>
    </Page>
  );
};
