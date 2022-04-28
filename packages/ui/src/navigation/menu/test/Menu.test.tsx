import { Component, createSignal } from 'solid-js';
import { fireEvent, render } from 'solid-testing-library';
import { Menu, MenuProps } from '../Menu';
import { MenuOption } from '../MenuOption';

const MenuTest: Component<MenuProps> = (props) => {
    const [ref, setRef] = createSignal<HTMLElement>();
    const [show, setShow] = createSignal<boolean>(props.isShow);

    const toggle = () => setShow(!show());

    return (
        <>
            <button
                class="test-btn"
                ref={setRef}
                onClick={toggle}
            >
                Menu
            </button>
            <Menu
                isShow={show()}
                reference={ref()}
                onBackdropClick={toggle}
            >
                <div class="menu-test">
                    <MenuOption><i class="fa-solid fa-car pr-2"/>Cars</MenuOption>
                    <MenuOption><i class="fa-solid fa-plane-departure pr-2"/>Plane</MenuOption>
                    <MenuOption><i class="fa-solid fa-building pr-2"/>Buildings</MenuOption>
                </div>
            </Menu>
        </>
    );
};

const getMenuContent = () => document.body.querySelector('.menu-test');

describe('Menu', () => {

    test('should be rendered', () => {
        render(() => <MenuTest isShow={true}/>);
        expect(getMenuContent()).toBeInTheDocument();
    });

    test('should be opened by trigger', () => {
        const result = render(() => <MenuTest isShow={false}/>);

        const trigger = result.container.querySelector('.test-btn');
        expect(trigger).toBeInTheDocument();
        if (trigger) {
            fireEvent.click(trigger);
            expect(getMenuContent()).toBeInTheDocument();
        }
    });

    test('should be closed by backdrop', async () => {
        render(() => <MenuTest isShow={true}/>);
        fireEvent.click(document.body);
        // await finish of animation
        await Promise.resolve();
        expect(getMenuContent()).not.toBeInTheDocument();
    });
});
