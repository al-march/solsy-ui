import { DOMElement } from 'solid-js/types/jsx';

export type PropInputEvent = InputEvent & { currentTarget: HTMLInputElement; target: DOMElement }
export type PropChangeEvent = Event & { currentTarget: HTMLInputElement; target: DOMElement }
export type PropFocusEvent = FocusEvent & { currentTarget: HTMLInputElement; target: DOMElement }
