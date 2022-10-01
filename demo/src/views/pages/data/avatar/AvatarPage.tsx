import {Page} from '@page/base';
import {Avatar} from '@ui/data-display';

export const AvatarPage = () => {
  return (
    <Page full class="p-2">
      <h2 class="text-2xl">Avatar</h2>
      <Avatar class="m-4">
        <Avatar.Item class="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src="https://placeimg.com/192/192/people" alt="" />
        </Avatar.Item>
      </Avatar>
    </Page>
  );
};
