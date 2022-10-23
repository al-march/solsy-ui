import {DaisySize} from '@ui/types';
import {mergeProps, ParentProps} from 'solid-js';

type TitleProps = {
  size?: DaisySize;
};

export const Title = (props: ParentProps<TitleProps>) => {
  const pr = mergeProps({size: 'sm'}, props);
  return (
    <h2
      class="py-1 mb-4"
      classList={{
        'text-4xl': pr.size === 'lg',
        'text-2xl': pr.size === 'md',
        'text-xl': pr.size === 'sm',
        'text-md': pr.size === 'xs',
      }}
    >
      {props.children}
    </h2>
  );
};
