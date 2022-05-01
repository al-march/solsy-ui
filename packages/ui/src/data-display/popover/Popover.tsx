import {
    Component,
    createContext,
    createEffect,
    createSignal,
    JSXElement,
    onCleanup,
    Show,
    useContext
} from 'solid-js';
import { BackdropClick, SlideUpTransition, usePopper } from '../../utils';
import { Portal } from 'solid-js/web';
import { createStore } from 'solid-js/store';

export const PopoverSelectors = {
    TRIGGER: 'popover-trigger',
    CONTENT: 'popover-content'
};

type PopoverState = {
    _isOpen: boolean;
    isOpen: boolean;
    isClose: boolean;
}

type PopoverContextType = {
    state: PopoverState;
    open: () => void;
    close: () => void;
}

const PopoverContext = createContext<PopoverContextType>();

const usePopover = () => {
    const context = useContext(PopoverContext);
    if (context) {
        return context;
    }
    throw new Error('No context for Popover');
};

export type PopoverProps = {
    trigger: JSXElement;
    show?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
}

export const Popover: Component<PopoverProps> = (props) => {
    const [ref, setRef] = createSignal<HTMLElement>();
    const [popper, setPopper] = createSignal<HTMLElement>();

    const [state, setState] = createStore<PopoverState>({
        _isOpen: !!props.show,
        get isOpen() {
            return this._isOpen;
        },
        get isClose() {
            return !this._isOpen;
        }
    });

    const instance = usePopper(ref, popper);

    onCleanup(() => {
        instance()?.destroy();
    });

    const open = () => {
        setState('_isOpen', true);
        props.onOpen?.();
    };

    const close = () => {
        setState('_isOpen', false);
        props.onClose?.();
    };

    function onBackdropClick(e: Event) {
        const target = e.target as HTMLElement;
        if (ref()?.contains(target)) {
            return;
        }
        close();
    }

    return (
        <PopoverContext.Provider value={{
            state,
            open,
            close,
        }}>
            <div
                data-testid={PopoverSelectors.TRIGGER}
                class="inline-block"
                ref={setRef}
                onClick={() => state.isOpen ? close() : open()}
            >
                {props.trigger}
            </div>

            <PopoverContent ref={setPopper}>
                <BackdropClick
                    onBackdropClick={onBackdropClick}
                >
                    {props.children}
                </BackdropClick>
            </PopoverContent>
        </PopoverContext.Provider>
    );
};

type PopoverContentProps = {
    ref: (el: HTMLElement) => void;
}

const PopoverContent: Component<PopoverContentProps> = (props) => {
    const popover = usePopover();
    const [show, setShow] = createSignal(popover.state.isOpen);

    createEffect(() => {
        if (popover.state.isOpen) {
            setShow(popover.state.isOpen);
        }
    });

    return (
        <Show when={show()}>
            <Portal>
                <div
                    data-testid={PopoverSelectors.CONTENT}
                    class="z-50"
                    ref={props.ref}
                >
                    <SlideUpTransition
                        appear={true}
                        onExit={() => setShow(false)}
                    >
                        {popover.state.isOpen && (
                            props.children
                        )}
                    </SlideUpTransition>
                </div>
            </Portal>
        </Show>
    );
};
