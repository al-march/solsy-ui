import {Code, ImportPreview} from '@shared/components';
import {Page} from '@shared/components/page';
import {Button, Modal, ModalAction} from '@ui/actions';
import {Divider} from '@ui/layout';
import {Component, createSignal} from 'solid-js';

export const ModalPage: Component = () => {
  const [show, setShow] = createSignal(false);
  let closeButton;

  function toggleModal() {
    setShow(!show());
  }

  return (
    <Page full class="p-4">
      <h2 class="text-2xl">Modals</h2>

      <Page.Section name="import">
        <br />
        <ImportPreview component="Modal" />
        <br />
      </Page.Section>

      <Page.Section name={'default usage'}>
        <h2 class="text-2xl">Default usage</h2>
        <br />
        <Button
          ref={ref => (closeButton = ref)}
          color="primary"
          onClick={toggleModal}
        >
          Open
        </Button>

        <Code>{`
          export const ModalExample = () => {
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
          };
        `}</Code>

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
      </Page.Section>
    </Page>
  );
};
