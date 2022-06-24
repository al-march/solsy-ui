import { ParentProps } from 'solid-js';

type Props = {
  full?: boolean;
  class?: string;
}

export const Page = (props: ParentProps<Props>) => {
  return (
    <div
      class={props.class}
      classList={{
        'flex-1': !!props.full
      }}
    >
      {props.children}
    </div>
  );
};
