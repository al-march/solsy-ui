import {ParentProps} from 'solid-js';

export const DividerSelectors = {
  DIVIDER: 'divider',
};

type Props = {
  class?: string;
  orientation?: 'vertical' | 'horizontal';
};

export const Divider = (props: ParentProps<Props>) => {
  return (
    <div
      data-testid={DividerSelectors.DIVIDER}
      class="divider"
      classList={{
        [props.class || '']: !!props.class,
        'divider-vertical': props.orientation === 'vertical',
        'divider-horizontal': props.orientation === 'horizontal',
      }}
    >
      {props.children}
    </div>
  );
};
