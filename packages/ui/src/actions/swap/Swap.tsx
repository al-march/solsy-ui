import {Component, createEffect, createSignal, ParentProps} from 'solid-js';
import {Dynamic} from 'solid-js/web';

export const SwapSelectors = {
  SWAP: 'swap',
  SWAP_ON: 'swap-on',
  SWAP_OFF: 'swap-off',
};

export type SwapProps<T = any> = {
  isOn?: boolean;
  class?: string;

  rotate?: boolean;
  flip?: boolean;

  as?: Component<T>;

  onSwap?: (isOn: boolean) => void;
} & T;

const SwapContent = (props: ParentProps) => {
  return <span class="inline-flex">{props.children}</span>;
};

const SwapBase = <T extends any>(props: ParentProps<SwapProps<T>>) => {
  const [isOn, setIsOn] = createSignal(props.isOn);

  createEffect(() => {
    setIsOn(props.isOn);
  });

  function toggle() {
    setIsOn(!isOn());
    props.onSwap?.(!!isOn());
  }

  return (
    <div onClick={toggle}>
      <Dynamic component={props.as || SwapContent} {...props}>
        <div
          data-testid={SwapSelectors.SWAP}
          class="swap"
          classList={{
            [props.class || '']: !!props.class,
            'swap-rotate': props.rotate,
            'swap-flip': props.flip,
            'swap-active': isOn(),
          }}
        >
          {props.children}
        </div>
      </Dynamic>
    </div>
  );
};

const SwapOn = (props: ParentProps<{class?: string}>) => {
  return (
    <div
      data-testid={SwapSelectors.SWAP_ON}
      class="inline-flex swap-on"
      classList={{[props.class || '']: !!props.class}}
    >
      {props.children}
    </div>
  );
};

const SwapOff = (props: ParentProps<{class?: string}>) => {
  return (
    <div
      data-testid={SwapSelectors.SWAP_OFF}
      class="inline-flex swap-off"
      classList={{[props.class || '']: !!props.class}}
    >
      {props.children}
    </div>
  );
};

export const Swap = Object.assign(SwapBase, {
  On: SwapOn,
  Off: SwapOff,
});
