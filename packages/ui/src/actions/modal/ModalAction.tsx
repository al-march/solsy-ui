import { Component } from 'solid-js';

export const ModalAction: Component = (props) => {
    return (
        <div class="modal-action">
            {props.children}
        </div>
    );
};