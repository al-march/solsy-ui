import { DOMElement } from 'solid-js/jsx-runtime';

export type PropMouseEvent<Target extends HTMLElement = HTMLElement> =
  MouseEvent & {
    currentTarget: Target;
    target: Element;
  };

export type PropInputEvent<Current extends HTMLElement = HTMLElement, Target extends Element = Element> =
  InputEvent & {
    currentTarget: Current;
    target: Target;
  };

export type PropChangeEvent<Target extends HTMLElement = HTMLElement> =
  Event & {
    currentTarget: Target;
    target: Element;
  };

export type PropFocusEvent<Current extends HTMLElement = HTMLElement, Target extends Element = Element> =
  FocusEvent & {
    currentTarget: Current;
    target: Target extends (HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) ? HTMLInputElement : DOMElement;
  };

export type PropClickEvent<Target extends HTMLElement = HTMLElement> =
  MouseEvent & {
    currentTarget: Target;
    target: Element;
  };

export type PropsKeyboardEvent<Target extends HTMLElement = HTMLElement> =
  KeyboardEvent & {
    currentTarget: Target;
    target: Element;
  };
