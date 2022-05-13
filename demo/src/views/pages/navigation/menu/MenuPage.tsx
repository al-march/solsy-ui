import { Component, createSignal } from 'solid-js';
import { Menu, MenuOption } from '../../../../../../packages/ui/src/navigation';
import { Page } from '../../base/Page';

type State = {
    show: boolean;
    reference?: HTMLElement;
}

export const MenuPage: Component = () => {
    const [state, setState] = createSignal<State>({
        show: false,
        reference: undefined
    });

    function setReference(reference: HTMLElement) {
        setState(state => ({
            ...state,
            reference
        }));
    }

    function toggle() {
        setState(state => {
            const show = !state.show;
            return {...state, show};
        });
    }

    return (
        <Page full class="p-4">
            <button
                class="btn btn-primary"
                ref={setReference}
                onClick={toggle}
            >
                Menu
            </button>
            <Menu
                isShow={state().show}
                reference={state().reference}
                onBackdropClick={toggle}
                minWidth={state().reference?.scrollWidth}
            >
                <MenuOption><i class="fa-solid fa-car pr-2"/>Cars</MenuOption>
                <MenuOption><i class="fa-solid fa-plane-departure pr-2"/>Plane</MenuOption>
                <MenuOption><i class="fa-solid fa-building pr-2"/>Buildings</MenuOption>
            </Menu>
        </Page>
    );
};
