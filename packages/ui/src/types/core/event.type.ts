import { DOMElement } from 'solid-js/types/jsx';

export type PropMouseEvent<Target extends HTMLElement = HTMLElement> =
    MouseEvent & {
    currentTarget: Target;
    target: DOMElement;
}

export type PropInputEvent<Target extends HTMLElement = HTMLElement> =
    InputEvent & {
    currentTarget: Target;
    target: DOMElement;
}

export type PropChangeEvent<Target extends HTMLElement = HTMLElement> =
    Event & {
    currentTarget: Target;
    target: DOMElement;
}

export type PropFocusEvent<Target extends HTMLElement = HTMLElement> =
    FocusEvent & {
    currentTarget: Target;
    target: DOMElement;
}

export type PropClickEvent<Target extends HTMLElement = HTMLElement> =
    MouseEvent & {
    currentTarget: Target;
    target: DOMElement;
}
