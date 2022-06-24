import { createSignal, onCleanup, onMount, ParentProps } from 'solid-js';

export const BackdropClickSelectors = {
  CLICKER: 'BackdropClick'
};

export type BackdropClickProps = {
  onContentClick?: (e: Event) => void;
  onBackdropClick?: (e: Event) => void;
  class?: string;
}

export const BackdropClick = (props: ParentProps<BackdropClickProps>) => {
  const [ref, setRef] = createSignal<HTMLElement>();

  onMount(() => {
    setListener();
  });

  onCleanup(() => {
    removeListener();
  });

  function setListener() {
    document.addEventListener('click', listener);
  }

  function removeListener() {
    document.removeEventListener('click', listener);
  }

  function listener(e: Event) {
    const target = e.target as HTMLElement;
    const content = ref();

    if (content?.contains(target)) {
      props.onContentClick?.(e);
    } else {
      props.onBackdropClick?.(e);
    }
  }

  return (
    <div
      data-testid={BackdropClickSelectors.CLICKER}
      ref={setRef}
      class={props.class}
    >
      {props.children}
    </div>
  );
};
