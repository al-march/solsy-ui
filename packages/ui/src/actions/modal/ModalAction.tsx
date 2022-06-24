import { ParentProps } from 'solid-js';

export const ModalAction = (props: ParentProps) => {
  return (
    <div class="modal-action">
      {props.children}
    </div>
  );
};
