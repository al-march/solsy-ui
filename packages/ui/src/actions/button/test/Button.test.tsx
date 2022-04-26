import { cleanup, render, screen } from 'solid-testing-library';
import { Button } from '../Button';


test('should be rendered', async () => {
    await render(() => <Button>button</Button>);
    const component = await screen.findByRole('button');
    expect(component).toBeInTheDocument();
});

test('should add color classes', async () => {
    await render(() => <Button color="primary">button primary</Button>);
    expect(await screen.findByText('button primary')).toHaveClass('btn-primary');

    await render(() => <Button color="secondary">button secondary</Button>);
    expect(await screen.findByText('button secondary')).toHaveClass('btn-secondary');

    await render(() => <Button color="accent">button accent</Button>);
    expect(await screen.findByText('button accent')).toHaveClass('btn-accent');

    await render(() => <Button color="info">button info</Button>);
    expect(await screen.findByText('button info')).toHaveClass('btn-info');

    await render(() => <Button color="success">button success</Button>);
    expect(await screen.findByText('button success')).toHaveClass('btn-success');

    await render(() => <Button color="warning">button warning</Button>);
    expect(await screen.findByText('button warning')).toHaveClass('btn-warning');

    await render(() => <Button color="error">button error</Button>);
    expect(await screen.findByText('button error')).toHaveClass('btn-error');

    await render(() => <Button color="ghost">button ghost</Button>);
    expect(await screen.findByText('button ghost')).toHaveClass('btn-ghost');

    await render(() => <Button link>button link</Button>);
    expect(await screen.findByText('button link')).toHaveClass('btn-link');
});

test('should add type classes', async () => {
    await render(() => <Button outline>button</Button>);
    expect(await screen.findByText('button')).toHaveClass('btn-outline');
    cleanup();

    await render(() => <Button active>button</Button>);
    expect(await screen.findByText('button')).toHaveClass('btn-active');
    cleanup();

    await render(() => <Button disabled>button</Button>);
    expect(await screen.findByText('button')).toHaveClass('btn-disabled');
    cleanup();

    await render(() => <Button circle>button</Button>);
    expect(await screen.findByText('button')).toHaveClass('btn-circle');
    cleanup();

    await render(() => <Button square>button</Button>);
    expect(await screen.findByText('button')).toHaveClass('btn-square');
    cleanup();

    await render(() => <Button loading>button</Button>);
    expect(await screen.findByText('button')).toHaveClass('loading');
    cleanup();

    await render(() => <Button glass>button</Button>);
    expect(await screen.findByText('button')).toHaveClass('glass');
    cleanup();
})

test('should add custom classes', async () => {
    await render(() => <Button class="my-custom-class">button</Button>);
    expect(await screen.findByText('button')).toHaveClass('my-custom-class')
});

test('should disable button', async () => {
    await render(() => <Button disabled>button</Button>);
    expect(await screen.findByText('button')).toBeDisabled();
    expect(await screen.findByText('button')).toHaveClass('btn-disabled');
})
