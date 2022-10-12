import {AlignItems, JustifyItems} from '../../types';
import {mergeProps, ParentProps} from 'solid-js';

export const RowSelectors = {
  ROW: 'row',
};

export type RowOrientation = 'row' | 'col';
export type RowItems = AlignItems;

type RowProps = {
  class?: string;
  orientation?: RowOrientation;
  items?: RowItems;
  justify?: JustifyItems;
};

const defaultProps: Required<RowProps> = {
  class: '',
  orientation: 'row',
  items: 'stretch',
  justify: 'start',
};

export const Row = (props: ParentProps<RowProps>) => {
  const pr = mergeProps({...defaultProps}, props);

  return (
    <div
      data-testid={RowSelectors.ROW}
      class="flex"
      classList={{
        [pr.class]: !!pr.class,
        'flex-row': pr.orientation === 'row',
        'flex-col': pr.orientation === 'col',

        'items-start': pr.items === 'start',
        'items-end': pr.items === 'end',
        'items-center': pr.items === 'center',
        'items-baseline': pr.items === 'baseline',
        'items-stretch': pr.items === 'stretch',

        'justify-start': pr.justify === 'start',
        'justify-end': pr.justify === 'end',
        'justify-center': pr.justify === 'center',
        'justify-stretch': pr.justify === 'stretch',
      }}
    >
      {props.children}
    </div>
  );
};
