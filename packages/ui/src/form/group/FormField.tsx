import { ParentProps } from 'solid-js';

export const FormField = (props: ParentProps) => {
  return (
    <div class="form-control relative mb-4">
      {props.children}
    </div>
  );
};
