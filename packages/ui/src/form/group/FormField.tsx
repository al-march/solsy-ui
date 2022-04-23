import { Component } from 'solid-js';

export const FormField: Component = (props) => {

    return (
        <div class="form-control relative mb-4">
            {props.children}
        </div>
    )
}
