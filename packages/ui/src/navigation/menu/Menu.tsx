import { Component, createEffect, createSignal, onCleanup, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import { BackdropClick, ScaleTransition, usePopper } from '../../utils';


export type MenuProps = {
    isShow: boolean;
    reference?: HTMLElement;
    onBackdropClick?: () => void;
    minWidth?: number;
}

/**
 * Создает меню с оверлеем.
 * Внедряется в элемент, к которому примонтировано приложение;
 * Не управляет самостоятельно своим состоянием отображения.
 * Переключается с помощью props.show
 *
 * @example
 *
 * <Menu
 *     isShow={isMenuShow()}
 *     reference={menuTrigger}
 *     onBackdropClick={toggleMenu}
 * >
 *     <div style={{'min-width': '150px'}} onClick={toggleMenu}>
 *         <MenuOption>Item 1</MenuOption>
 *         <MenuOption>Item 2</MenuOption>
 *         <MenuOption>Item 3</MenuOption>
 *     </div>
 * </Menu>
 */
export const Menu: Component<MenuProps> = (props) => {

    const [ref] = createSignal(props.reference);
    const [popper, setPopper] = createSignal<HTMLElement>();
    const [show, toggleShow] = createSignal(false);

    /**
     * Создаем компонент, помещаем в DOM
     */
    createEffect(() => {
        if (props.isShow) {
            toggleShow(true);
        }
    });

    function destroy() {
        toggleShow(false);
    }

    const instance = usePopper(ref, popper, {
        modifiers: [{
            name: 'offset',
            options: {
                offset: [0, 8],
            },
        }]
    });

    onCleanup(() => {
        instance()?.destroy();
    });

    function onBackdropClick(e: Event) {
        const target = e.target as HTMLElement;
        if (ref()?.contains(target)) {
            return;
        }
        props.onBackdropClick?.();
    }

    return (
        <Show when={show()}>
            <Portal>
                <BackdropClick
                    onBackdropClick={onBackdropClick}
                >
                    <div
                        ref={setPopper}
                        style={{'min-width': props.minWidth + 'px'}}
                        onClick={e => e.stopPropagation()}
                    >
                        <ScaleTransition appear={true} onExit={destroy}>
                            {props.isShow && (
                                <ul class="menu bg-base-200 z-10 shadow-xl">
                                    {props.children}
                                </ul>
                            )}
                        </ScaleTransition>
                    </div>
                </BackdropClick>
            </Portal>
        </Show>
    );
};
