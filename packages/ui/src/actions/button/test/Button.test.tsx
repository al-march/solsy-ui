import { cleanup, render, screen } from 'solid-testing-library';
import { Button } from '../Button';


describe('Button', () => {

    test('should be rendered', async () => {
        render(() => <Button>button</Button>);
        const component = await screen.findByRole('button');
        expect(component).toBeInTheDocument();
    });

    test('should add color classes', async () => {
        render(() => <Button color="primary">button primary</Button>);
        expect(await screen.findByText('button primary')).toHaveClass('btn-primary');

        render(() => <Button color="secondary">button secondary</Button>);
        expect(await screen.findByText('button secondary')).toHaveClass('btn-secondary');

        render(() => <Button color="accent">button accent</Button>);
        expect(await screen.findByText('button accent')).toHaveClass('btn-accent');

        render(() => <Button color="info">button info</Button>);
        expect(await screen.findByText('button info')).toHaveClass('btn-info');

        render(() => <Button color="success">button success</Button>);
        expect(await screen.findByText('button success')).toHaveClass('btn-success');

        render(() => <Button color="warning">button warning</Button>);
        expect(await screen.findByText('button warning')).toHaveClass('btn-warning');

        render(() => <Button color="error">button error</Button>);
        expect(await screen.findByText('button error')).toHaveClass('btn-error');

        render(() => <Button color="ghost">button ghost</Button>);
        expect(await screen.findByText('button ghost')).toHaveClass('btn-ghost');

        render(() => <Button link>button link</Button>);
        expect(await screen.findByText('button link')).toHaveClass('btn-link');
    });

    test('should add type classes', async () => {
        render(() => <Button outline>button</Button>);
        expect(await screen.findByText('button')).toHaveClass('btn-outline');
        cleanup();

        render(() => <Button active>button</Button>);
        expect(await screen.findByText('button')).toHaveClass('btn-active');
        cleanup();

        render(() => <Button disabled>button</Button>);
        expect(await screen.findByText('button')).toHaveClass('btn-disabled');
        cleanup();

        render(() => <Button circle>button</Button>);
        expect(await screen.findByText('button')).toHaveClass('btn-circle');
        cleanup();

        render(() => <Button square>button</Button>);
        expect(await screen.findByText('button')).toHaveClass('btn-square');
        cleanup();

        render(() => <Button loading>button</Button>);
        expect(await screen.findByText('button')).toHaveClass('loading');
        cleanup();

        render(() => <Button glass>button</Button>);
        expect(await screen.findByText('button')).toHaveClass('glass');
        cleanup();
    })

    test('should add custom classes', async () => {
        render(() => <Button class="my-custom-class">button</Button>);
        expect(await screen.findByText('button')).toHaveClass('my-custom-class')
    });

    test('should disable button', async () => {
        render(() => <Button disabled>button</Button>);
        expect(await screen.findByText('button')).toBeDisabled();
        expect(await screen.findByText('button')).toHaveClass('btn-disabled');
    })
})
