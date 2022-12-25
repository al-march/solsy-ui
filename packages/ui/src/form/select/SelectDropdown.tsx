import {BackdropClick, ScaleTransition, usePopper} from '../../utils';
import {SelectSelectors} from './Select';
import {
  Accessor,
  createEffect,
  createSignal,
  onCleanup,
  ParentProps,
  Show,
} from 'solid-js';
import {createStore} from 'solid-js/store';
import {Portal} from 'solid-js/web';

type Props = {
  show: boolean;
  reference: Accessor<HTMLElement | undefined>;
  onClose?: () => void;
};

export const SelectDropdown = (props: ParentProps<Props>) => {
  const [dropdown, setDropdown] = createSignal<HTMLElement>();
  const [state, setState] = createStore({
    isRender: false,
    isOpen: false,
  });

  createEffect(() => {
    if (props.show) {
      setState('isRender', true);
      setState('isOpen', true);
      focusOption();
    } else {
      setState('isOpen', false);
    }
  });

  onCleanup(() => {
    instance()?.destroy();
  });

  const instance = usePopper(props.reference, dropdown, {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  function focusOption() {
    const optionsRef = dropdown()?.querySelector(
      `.${SelectSelectors.OPTION_BUTTON}`
    ) as HTMLButtonElement;

    if (optionsRef) {
      optionsRef.focus();
    }
  }

  const onBackdropClick = (e: Event) => {
    const target = e.target as HTMLElement;
    if (props.reference()?.contains(target)) {
      return;
    }

    setState('isOpen', false);
    props.onClose?.();
  };

  const destroy = () => {
    setState('isRender', false);
  };

  return (
    <Show when={state.isRender}>
      <Portal>
        <BackdropClick onBackdropClick={onBackdropClick}>
          <div
            data-testid={SelectSelectors.DROPDOWN}
            ref={setDropdown}
            class="z-50"
            style={{'min-width': props.reference()?.offsetWidth + 'px'}}
          >
            <ScaleTransition appear={true} onExit={destroy}>
              <Show when={state.isOpen}>
                <ul class="shadow-lg menu dropdown-content bg-base-200 max-h-60 overflow-y-auto">
                  {props.children}
                </ul>
              </Show>
            </ScaleTransition>
          </div>
        </BackdropClick>
      </Portal>
    </Show>
  );
};
