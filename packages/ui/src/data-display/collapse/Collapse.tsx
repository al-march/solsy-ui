import { JSXElement, ParentProps } from 'solid-js';
import { PropClickEvent, PropFocusEvent } from '../../types';

export const CollapseSelectors = {
  COLLAPSE: 'collapse',
  LABEL: 'label',
  CONTENT: 'content'
};

export type CollapseIcon = 'plus' | 'arrow';

export type CollapseProps = {
  label: JSXElement;
  class?: string;
  ref?: (ref: HTMLDivElement) => void;

  icon?: CollapseIcon;

  onClick?: (e: PropClickEvent<HTMLDivElement>) => void;
  onFocus?: (e: PropFocusEvent<HTMLDivElement>) => void;
  onBlur?: (e: PropFocusEvent<HTMLDivElement>) => void;
}

export const Collapse = (props: ParentProps<CollapseProps>) => {
  return (
    <div
      data-testid={CollapseSelectors.COLLAPSE}
      ref={props.ref}
      tabIndex="0"
      class={`collapse ${props.class || ''}`}
      classList={{
        'collapse-arrow': props.icon === 'arrow',
        'collapse-plus': props.icon === 'plus',
      }}

      onClick={props.onClick}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
    >
      <div data-testid={CollapseSelectors.LABEL} class="collapse-title">
        {props.label}
      </div>
      <div data-testid={CollapseSelectors.CONTENT} class="collapse-content">
        {props.children}
      </div>
    </div>
  );
};

