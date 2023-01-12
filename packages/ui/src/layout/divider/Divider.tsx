import {JSX, mergeProps, splitProps} from 'solid-js';

export const DividerSelectors = {
  DIVIDER: 'divider',
};

type Props = {
  orientation?: 'vertical' | 'horizontal';
} & JSX.HTMLAttributes<HTMLDivElement>;

export const Divider = (props: Props) => {
  const merge = mergeProps({class: '', classList: {}}, props);
  const [local, others] = splitProps(merge, [
    'orientation',
    'class',
    'classList',
  ]);

  return (
    <div
      data-testid={DividerSelectors.DIVIDER}
      class="divider"
      classList={{
        [local.class]: !!local.class,
        'divider-vertical': local.orientation === 'vertical',
        'divider-horizontal': local.orientation === 'horizontal',

        ...local.classList,
      }}
      {...others}
    />
  );
};
