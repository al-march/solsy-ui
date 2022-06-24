import { createEffect, createSignal, ParentProps, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import { Placement } from '@popperjs/core';
import { ScaleTransition, usePopper } from '../../utils';

export type TooltipProps = {
  message: string;
  placement?: Placement;
  class?: string;
}

/**
 * Tooltip
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
export const Tooltip = (props: ParentProps<TooltipProps>) => {

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

  const hideTooltip = () => {
    setShow(false);
    setTooltip(false);
  };

  return (
    <>
      <span
        data-testid="tooltip-trigger"
        class={`inline-block ${props.class || ''}`}
        ref={setTriggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
          {props.children}
      </span>

      <Show when={show()}>
        <Portal>
          <div data-testid="tooltip" ref={setPopperRef}>
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
