import {DaisyColor, PropInputEvent} from '../../types';
import {JSX, ParentProps, splitProps} from 'solid-js';

export const TextareaSelectors = {
  TEXTAREA: 'textarea',
};

export type TextareaColors = DaisyColor | 'ghost';

export type TextareaProps = {
  autosize?: boolean;
  resize?: boolean;
  color?: TextareaColors;
  error?: boolean;
  bordered?: boolean;
  onInput?: (e: PropInputEvent<HTMLTextAreaElement>) => void;
} & JSX.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = (props: ParentProps<TextareaProps>) => {
  const [local, others] = splitProps(props, [
    'autosize',
    'resize',
    'color',
    'error',
    'bordered',
    'onInput',
    'rows',
    'class',
    'classList',
  ]);

  const onInput = (e: PropInputEvent<HTMLTextAreaElement>) => {
    if (local.autosize) {
      const ref = e.currentTarget;
      ref.style.height = 'auto';
      ref.style.height = ref.scrollHeight + 'px';
    }

    local.onInput?.(e);
  };

  return (
    <textarea
      data-testid={TextareaSelectors.TEXTAREA}
      rows={local.rows || 1}
      class="textarea h-auto min-h-0"
      classList={{
        [local.class || '']: !!local.class,
        'textarea-primary': local.color === 'primary',
        'textarea-secondary': local.color === 'secondary',
        'textarea-accent': local.color === 'accent',
        'textarea-info': local.color === 'info',
        'textarea-success': local.color === 'success',
        'textarea-warning': local.color === 'warning',
        'textarea-error': local.color === 'error' || local.error,
        'textarea-ghost': local.color === 'ghost',

        'textarea-bordered': local.bordered,
        'overflow-hidden': !!local.autosize,
        'resize-none': !local.resize,
        'resize': !!local.resize,

        ...local.classList,
      }}
      onInput={onInput}
      {...others}
    ></textarea>
  );
};
