import {Divider} from '../../../../../../packages/ui/src/layout';
import {Page} from '../../base/Page';

export const DividerPage = () => {
  return (
    <Page full class="p-4">
      <h2 class="text-2xl">Divider</h2>

      <p class="py-4">Vertical</p>

      <div class="flex flex-col w-full border-opacity-50">
        <div class="grid h-20 card bg-base-300 rounded-box place-items-center">
          content
        </div>
        <Divider>OR</Divider>
        <div class="grid h-20 card bg-base-300 rounded-box place-items-center">
          content
        </div>
      </div>

      <div class="py-4">Horizontal</div>

      <div class="flex w-full">
        <div class="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">content</div>
        <Divider orientation="horizontal">OR</Divider>
        <div class="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">content</div>
      </div>
    </Page>
  );
};
