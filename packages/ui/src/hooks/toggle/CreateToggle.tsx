import {Accessor, createSignal} from 'solid-js';

export type CreateToggle = {
  isActive: Accessor<boolean>;
  setActive: (state: boolean) => void;
  onActive: () => void;
  onUnActive: () => void;
  onToggle: () => void;
};

export function createToggle(initialState = false): CreateToggle {
  const [isActive, setActive] = createSignal(initialState);

  function onActive() {
    setActive(true);
  }

  function onUnActive() {
    setActive(false);
  }

  function onToggle() {
    setActive(!isActive());
  }

  return {
    isActive,
    setActive,
    onActive,
    onUnActive,
    onToggle,
  };
}
