import {ComponentProps, ImportPreview} from '@shared/components';
import {Page} from '@shared/components/page';
import {Button, Swap} from '@ui/actions';
import {Badge} from '@ui/data-display';
import {Divider, Row} from '@ui/layout';

export const SwapPage = () => {
  return (
    <Page full class="p-4">
      <h2 class="text-2xl">Buttons</h2>

      <Page.Section name={'Import'}>
        <br />
        <ImportPreview component="Swap" />
      </Page.Section>

      <Page.Section name="usage">
        <Page.Title>Usage</Page.Title>

        <Page.Component
          preview={
            <Swap>
              <Swap.Off>
                <svg
                  class="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                >
                  <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
                </svg>
              </Swap.Off>
              <Swap.On>
                <svg
                  class="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                >
                  <path d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z" />
                </svg>
              </Swap.On>
            </Swap>
          }
          snippet={`
            <Swap>
              <Swap.Off>
                <svg
                  class="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                >
                  <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
                </svg>
              </Swap.Off>
              <Swap.On>
                <svg
                  class="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                >
                  <path d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z" />
                </svg>
              </Swap.On>
            </Swap>
          `}
        />
      </Page.Section>

      <Page.Section name="Swap text">
        <Page.Title>Swap text</Page.Title>

        <Page.Component
          preview={
            <Swap>
              <Swap.Off>
                <span class="text-xl font-medium">Off</span>
              </Swap.Off>
              <Swap.On>
                <span class="text-xl font-medium">On</span>
              </Swap.On>
            </Swap>
          }
          snippet={`
            <Swap>
              <Swap.Off>
                <span class="text-xl font-medium">Off</span>
              </Swap.Off>
              <Swap.On>
                <span class="text-xl font-medium">On</span>
              </Swap.On>
            </Swap>
          `}
        />
      </Page.Section>

      <Page.Section name="Swap with rotate">
        <Page.Title>Swap with rotate effect</Page.Title>

        <Page.Component
          preview={
            <Swap rotate>
              <Swap.Off>
                <svg
                  class="fill-current w-10 h-10"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>
              </Swap.Off>
              <Swap.On>
                <svg
                  class="fill-current w-10 h-10"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </Swap.On>
            </Swap>
          }
          snippet={`
            <Swap rotate>
              <Swap.Off>
                <svg
                  class="fill-current w-10 h-10"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>
              </Swap.Off>
              <Swap.On>
                <svg
                  class="fill-current w-10 h-10"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </Swap.On>
            </Swap>
          `}
        />
      </Page.Section>

      <Page.Section name="Hamburger button">
        <Page.Title>Hamburger button</Page.Title>

        <Page.Component
          preview={
            <Swap as={Button} circle color="primary" rotate>
              <Swap.Off>
                <svg
                  class="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512"
                >
                  <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                </svg>
              </Swap.Off>
              <Swap.On>
                <svg
                  class="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512"
                >
                  <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                </svg>
              </Swap.On>
            </Swap>
          }
          snippet={`
            <Swap as={Button} circle color="primary" rotate>
              <Swap.Off>
                <svg
                  class="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512"
                >
                  <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                </svg>
              </Swap.Off>
              <Swap.On>
                <svg
                  class="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512"
                >
                  <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                </svg>
              </Swap.On>
            </Swap>
          `}
        />
      </Page.Section>

      <Page.Section name="Swap with flip">
        <Page.Title>Swap with flip</Page.Title>

        <Page.Component
          preview={
            <Swap flip class="text-9xl">
              <Swap.Off>😈</Swap.Off>
              <Swap.On>😇</Swap.On>
            </Swap>
          }
          snippet={`
            <Swap flip class="text-9xl">
              <Swap.Off>😈</Swap.Off>
              <Swap.On>😇</Swap.On>
            </Swap>
          `}
        />
      </Page.Section>

      <Page.Section name="swap badge">
        <Page.Title>Swap Badge</Page.Title>

        <Page.Component
          preview={
            <Swap as={Badge} flip color="secondary" class="cursor-pointer">
              <Swap.Off>Off</Swap.Off>
              <Swap.On>On</Swap.On>
            </Swap>
          }
          snippet={`
            <Swap as={Badge} flip color="secondary" class="cursor-pointer">
              <Swap.Off>Off</Swap.Off>
              <Swap.On>On</Swap.On>
            </Swap>
          `}
        />
      </Page.Section>

      <Page.Section name="props">
        <Page.Title>Swap props</Page.Title>

        <Row orientation="col">
          <ComponentProps
            name="as"
            description="Wrapper component"
            types="Component<T>"
            defaultValue="undefined"
          />

          <Divider />

          <ComponentProps
            name="isOn"
            description="Is show On state"
            types="boolean"
            defaultValue="false"
          />

          <Divider />

          <ComponentProps
            name="rotate"
            description="Rotate animation"
            types="boolean"
            defaultValue="false"
          />

          <Divider />

          <ComponentProps
            name="flip"
            description="Flip animation"
            types="boolean"
            defaultValue="false"
          />

          <Divider />

          <ComponentProps
            name="onSwap"
            description="Emit on swap changes"
            types="(isOn: boolean) => void"
            defaultValue="undefined"
          />
        </Row>
      </Page.Section>
    </Page>
  );
};
