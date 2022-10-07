import {Page} from '@page/base';
import {ImportPreview} from '@shared/components';
import {Button} from '@ui/actions';
import {Popover} from '@ui/data-display';

export const PopoverPage = () => {
  return (
    <Page full class="p-4">
      <h2 class="text-2xl">Popover</h2>

      <br />
      <ImportPreview component="Popover" />
      <br />

      <Popover trigger={<Button>Trigger</Button>}>
        <div class="card w-96 bg-base-300 shadow-xl">
          <figure>
            <img
              src="https://api.lorem.space/image/shoes?w=400&h=225"
              alt="Shoes"
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
              <Button color="primary">Buy Now</Button>
            </div>
          </div>
        </div>
      </Popover>
    </Page>
  );
};
