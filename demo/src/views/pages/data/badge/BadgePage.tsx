import {Badge} from '../../../../../../packages/ui/src/data-display';
import {Page} from '../../base/Page';
import {Component} from 'solid-js';
import { Button } from '../../../../../../packages/ui/src/actions';

export const BadgePage: Component = () => {
  return (
    <Page full class='p-4'>
      <h1 class='text-2xl mb-10'>Badges</h1>

      <h2 class='text-xl mb-5'>Types</h2>
      <div class='flex gap-2 p-2'>
        <Badge>Standard badge</Badge>
        <Badge outline>Outline badge</Badge>
      </div>

      <div class='divider'></div>

      <h2 class='text-xl mb-5'>Sizes</h2>
      <div class='flex gap-2 p-2 items-center'>
        <Badge size='lg'>Large</Badge>
        <Badge size='md'>Medium</Badge>
        <Badge size='sm'>Small</Badge>
        <Badge size='xs'>Extra Small</Badge>
      </div>
      <div class='flex gap-2 p-2 items-center'>
        <Badge outline size='lg'>
          Large
        </Badge>
        <Badge outline size='md'>
          Medium
        </Badge>
        <Badge outline size='sm'>
          Small
        </Badge>
        <Badge outline size='xs'>
          Extra Small
        </Badge>
      </div>

      <div class='divider'></div>

      <h2 class='text-xl mb-5'>Colors</h2>
      <div class='flex gap-2 p-2 items-center'>
        <Badge color='primary'>Primary</Badge>
        <Badge color='secondary'>Secondary</Badge>
        <Badge color='accent'>Accent</Badge>
        <Badge color='info'>Info</Badge>
        <Badge color='success'>Success</Badge>
        <Badge color='warning'>Warning</Badge>
        <Badge color='error'>Error</Badge>
        <Badge color='ghost'>Ghost</Badge>
      </div>
      <div class='flex gap-2 p-2 items-center'>
        <Badge outline color='primary'>
          Primary
        </Badge>
        <Badge outline color='secondary'>
          Secondary
        </Badge>
        <Badge outline color='accent'>
          Accent
        </Badge>
        <Badge outline color='info'>
          Info
        </Badge>
        <Badge outline color='success'>
          Success
        </Badge>
        <Badge outline color='warning'>
          Warning
        </Badge>
        <Badge outline color='error'>
          Error
        </Badge>
        <Badge outline color='ghost'>
          Ghost
        </Badge>
      </div>

      <div class='divider'></div>

      <h2 class='text-xl mb-5'>Empty badges</h2>
      <div class='flex gap-2 p-2 items-center'>
        <Badge size='lg'></Badge>
        <Badge size='md'></Badge>
        <Badge size='sm'></Badge>
        <Badge size='xs'></Badge>
      </div>
      <div class='flex gap-2 p-2 items-center'>
        <Badge outline size='lg'></Badge>
        <Badge outline size='md'></Badge>
        <Badge outline size='sm'></Badge>
        <Badge outline size='xs'></Badge>
      </div>

      <div class='divider'></div>

      <h2 class='text-xl mb-5'>Badge in a text</h2>
      <p class='text-lg mb-1'>
        Heading <Badge size='lg'>New</Badge>
      </p>
      <p class='text-base mb-1'>
        Heading <Badge size='md'>New</Badge>
      </p>
      <p class='text-sm mb-1'>
        Heading <Badge size='sm'>New</Badge>
      </p>
      <p class='text-xs mb-1'>
        Heading <Badge size='xs'>New</Badge>
      </p>

      <div class='divider'></div>

      <h2 class='text-xl mb-5'>Badge in a button</h2>
      <div class='flex gap-2 p-2 items-center'>
        <Button>Messages <Badge class="ml-2" color="info">99</Badge></Button>
        <Button>Messages <Badge class="ml-2" outline color="info">99</Badge></Button>
      </div>
    </Page>
  );
};
