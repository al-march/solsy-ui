import { ParentProps } from 'solid-js';

type Props = {
  onClick?: () => void;
}
// Todo: delete (change to BackdropClick)
export const Overlay = (props: ParentProps<Props>) => {
  return (
    <div class="overlay" onClick={() => props.onClick && props.onClick()}>
      {props.children}
    </div>
  );
};
