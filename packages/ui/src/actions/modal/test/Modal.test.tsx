import { fireEvent, render, screen } from 'solid-testing-library';
import { Modal } from '../Modal';
import { Component, createSignal } from 'solid-js';

const ModalTest: Component<{ show: boolean }> = (props) => {
    const [show, setShow] = createSignal(props.show);
    const toggle = () => setShow(!show());

    return (
        <>
            <button data-testid="modal-btn" onClick={toggle}>btn</button>
            <Modal isShow={show()} onBackdropClick={toggle}>
                <div data-testid="modal-content">
                    <h3 class="font-bold text-lg">Modal title</h3>
                </div>
            </Modal>
        </>
    );
};

const btn = () => screen.findByTestId('modal-btn');
const content = () => screen.findByTestId('modal-content');

describe('Modal', () => {

    test('should be rendered', async () => {
        await render(() => <ModalTest show={true}/>);
        expect(await content()).toBeInTheDocument();
    });

    test('should be rendered by btn click', async () => {
        await render(() => <ModalTest show={false}/>);
        await screen.findByTestId('modal-content').catch(err => {
            expect(err).toBeTruthy();
        });

        fireEvent.click(await btn());
        expect(await content()).toBeInTheDocument();
    });

    test('should be closed after backdrop clicked', async () => {
        await render(() => <ModalTest show={true}/>);

        expect(await content()).toBeInTheDocument();
        fireEvent.click(document.body);

        await content().catch(err => {
            expect(err).toBeTruthy();
        });
    });

    test('should add custom classes', async () => {
        const customClass = 'custom-modal-class';

        await render(() => (
            <div data-testid="modal-backdrop">
                <Modal isShow={true} class={customClass}>
                    <h3>test classes</h3>
                </Modal>
            </div>
        ));

        expect(document.body.querySelector(`.${customClass}`)).toBeInTheDocument();
    })
})
