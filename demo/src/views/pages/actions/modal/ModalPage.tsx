import { Component, createSignal } from 'solid-js';
import { Page } from '../../base/Page';
import { Modal, ModalAction } from '../../../../../../packages/ui/src/actions';

export const ModalPage: Component = () => {

    const [show, setShow] = createSignal(false);
    let closeButton;

    function toggleModal() {
        setShow(!show());
    }

    return (
        <Page full class="p-4">
            <h2 class="text-2xl">Modals</h2>
            <br/>

            <button ref={closeButton} class="btn btn-primary" onClick={toggleModal}>Open</button>

            <Modal isShow={show()} onBackdropClick={toggleModal} trigger={closeButton}>
                <h3 class="font-bold text-2xl">Modal title</h3>
                <div class="divider"/>
                <p>Modal description</p>
                <ModalAction>
                    <button class="btn" onClick={toggleModal}>Yay!</button>
                </ModalAction>
            </Modal>
        </Page>
    );
};
