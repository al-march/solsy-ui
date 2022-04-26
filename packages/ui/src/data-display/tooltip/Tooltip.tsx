import { Component, createEffect, createSignal, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import { Placement } from '@popperjs/core';
import { ScaleTransition, usePopper } from '../../utils';

type Props = {
    message: string;
    placement?: Placement;
    class?: string;
}

/**
 * Tooltip - компонент обертка для создания подсказок
 *
 * @example
 * <Tooltip
 *    message="Tooltip Message"
 *    placement="right"
 * >
 *    <button class="btn btn-primary">
 *        Tooltip
 *    </button>
 * </Tooltip>
 */
export const Tooltip: Component<Props> = (props) => {

    const [show, setShow] = createSignal(false);
    const [tooltip, setTooltip] = createSignal(false);
    const [triggerRef, setTriggerRef] = createSignal<HTMLElement>();
    const [popperRef, setPopperRef] = createSignal<HTMLElement>();

    createEffect(() => {
        usePopper(triggerRef, popperRef, {
            placement: props.placement || 'top',
            modifiers: [{
                name: 'offset',
                options: {
                    offset: [0, 10],
                },
            }]
        });
    });

    const showTooltip = () => {
        setShow(true);
        setTooltip(true);
    };

    return (
        <>
            <span
                class={`inline-block ${props.class || ''}`}
                ref={setTriggerRef}
                onMouseEnter={showTooltip}
                onMouseLeave={() => setShow(false)}
            >
                {props.children}
            </span>

            <Show when={show()}>
                <Portal>
                    <div ref={setPopperRef}>
                        <ScaleTransition appear={true}>
                            {tooltip() && (
                                <div class="rounded shadow-lg bg-base-200 p-2">
                                    {props.message}
                                </div>
                            )}
                        </ScaleTransition>
                    </div>
                </Portal>
            </Show>
        </>
    );
};
