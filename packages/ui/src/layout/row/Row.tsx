import {AlignItems, JustifyItems} from '../../types';
import {JSX, mergeProps, splitProps} from 'solid-js';

export const RowSelectors = {
  ROW: 'row',
};

export type RowOrientation = 'row' | 'col';
export type RowItems = AlignItems;

type RowProps = {
  orientation?: RowOrientation;
  items?: RowItems;
  justify?: JustifyItems;
} & JSX.HTMLAttributes<HTMLDivElement>;

const defaultProps: Required<
  Pick<RowProps, 'class' | 'orientation' | 'items' | 'justify'>
> = {
  class: '',
  orientation: 'row',
  items: 'stretch',
  justify: 'start',
};

export const Row = (props: RowProps) => {
  const pr = mergeProps({...defaultProps}, props);
  const [local, others] = splitProps(pr, [
    'orientation',
    'items',
    'justify',
    'class',
    'classList',
  ]);

  return (
    <div
      data-testid={RowSelectors.ROW}
      class="flex"
      classList={{
        [local.class]: !!local.class,
        'flex-row': local.orientation === 'row',
        'flex-col': local.orientation === 'col',

        'items-start': local.items === 'start',
        'items-end': local.items === 'end',
        'items-center': local.items === 'center',
        'items-baseline': local.items === 'baseline',
        'items-stretch': local.items === 'stretch',

        'justify-start': local.justify === 'start',
        'justify-end': local.justify === 'end',
        'justify-center': local.justify === 'center',
        'justify-stretch': local.justify === 'stretch',

        ...local.classList,
      }}
      {...others}
    />
  );
};
