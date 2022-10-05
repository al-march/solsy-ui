import {For, JSXElement, ParentProps} from 'solid-js';

type Props<C, S> = {
  colors: C[];
  sizes: S[];
  class?: string;

  component: (color: C, size: S) => JSXElement;
};

export const ExampleTable = <C extends JSXElement, S extends JSXElement>(
  props: ParentProps<Props<C, S>>
) => {
  return (
    <table class="table" classList={{[props.class || '']: !!props.class}}>
      <thead>
        <tr>
          <th></th>
          <For each={props.colors}>
            {color => <th>{color || 'default'}</th>}
          </For>
        </tr>
      </thead>

      <tbody>
        <For each={props.sizes}>
          {size => (
            <tr>
              <th>{size}</th>
              <For each={props.colors}>
                {color => <th>{props.component(color, size)}</th>}
              </For>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
};
