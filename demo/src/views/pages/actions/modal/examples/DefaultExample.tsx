import {Page} from '@shared/components/page';
import {Button, Modal, ModalAction} from '@ui/actions';
import {createToggle} from '@ui/hooks';
import {Divider} from '@ui/layout';

export const DefaultExample = () => {
  const {isActive, onToggle} = createToggle();

  return (
    <Page.Component
      preview={
        <>
          <Button color="primary" onClick={onToggle}>
            Toggle
          </Button>
          <Modal show={isActive()} onBackdropClick={onToggle}>
            <h3 class="font-bold text-2xl">Modal title</h3>
            <Divider />
            <p>Modal description</p>
            <ModalAction>
              <Button onClick={onToggle}>Yay!</Button>
            </ModalAction>
          </Modal>
        </>
      }
      snippet={`
        const {isShow, toggle} = createShowSignal();
        return (
          <>
            <Button color="primary" onClick={toggle}>
              Toggle
            </Button>
            <Modal isShow={isShow()} onBackdropClick={toggle}>
              <h3 class="font-bold text-2xl">Modal title</h3>
              <Divider />
              <p>Modal description</p>
              <ModalAction>
                <Button onClick={toggle}>Yay!</Button>
              </ModalAction>
            </Modal>
          </>
        )
      `}
    />
  );
};
