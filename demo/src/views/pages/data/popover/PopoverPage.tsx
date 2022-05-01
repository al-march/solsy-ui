import { Page } from '../../base/Page';
import { Popover } from '../../../../../../packages/ui/src/data-display';
import { Button } from '../../../../../../packages/ui/src/actions';


export const PopoverPage = () => {
    return (
        <Page full class="p-4">
            <h2 class="text-2xl">Popover</h2>

            <Popover trigger={<Button>Trigger</Button>}>
                <div class="card w-96 bg-base-300 shadow-xl">
                    <figure><img src="https://api.lorem.space/image/shoes?w=400&h=225" alt="Shoes" /></figure>
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
    )
}
