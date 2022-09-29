import {ParentProps} from 'solid-js';

export const AvatarSelectors = {
  AVATAR: 'avatar',
  ITEM: 'avatar-item',
};

type Props = {
  class?: string;
};

const AvatarBase = (props: ParentProps<Props>) => {
  return (
    <div
      data-testid={AvatarSelectors.AVATAR}
      class="avatar"
      classList={{
        [props.class || '']: !!props.class,
      }}
    >
      {props.children}
    </div>
  );
};

type AvatarItemProps = {
  width?: string;
  class?: string;
};

const AvatarItem = (props: ParentProps<AvatarItemProps>) => {
  return (
    <div
      data-testid={AvatarSelectors.ITEM}
      class="w-24 rounded"
      classList={{
        [props.class || '']: !!props.class,
      }}
    >
      {props.children}
    </div>
  );
};

export const Avatar = Object.assign(AvatarBase, {Item: AvatarItem});
