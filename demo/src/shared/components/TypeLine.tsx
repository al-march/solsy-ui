import {For, ParentProps, Show} from 'solid-js';

type Props = {
  types: string[];
};

export function TypeLine(props: ParentProps<Props>) {
  return (
    <For each={props.types}>
      {(color, i) => (
        <>
          <strong class="text-info"> {color}</strong>
          <Show when={i() !== props.types.length - 1} keyed>
            ,{' '}
          </Show>
        </>
      )}
    </For>
  );
}
