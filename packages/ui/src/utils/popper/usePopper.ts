import {createPopper, Instance, Options} from '@popperjs/core';
import {Accessor, createEffect, createSignal, onCleanup} from 'solid-js';

/**
 * Хук для работы с Popper для SolidJs
 * Получаем на вход ассесоры html элементов
 * При наличии реальных html создается Instance
 *
 * @example
 * const instance = usePopper(reference, popper, {
 *     placement: props.placement || 'top',
 *     modifiers: [{
 *         name: 'offset',
 *         options: {
 *             offset: [0, 10],
 *         },
 *     }]
 * });
 *
 * @returns Popper.Instance | undefined
 */
export function usePopper<T extends HTMLElement>(
  referenceAccessor: Accessor<T | undefined | null>,
  popperAccessor: Accessor<T | undefined | null>,
  options: Partial<Options> = {}
): () => Instance | undefined {
  const [instance, setInstance] = createSignal<Instance>();

  /*
   * Инициализируем Popper
   */
  createEffect(() => {
    setInstance(undefined);

    const reference = referenceAccessor();
    const popper = popperAccessor();

    if (reference && popper) {
      const instance = createPopper(reference, popper, options);

      setInstance(instance);

      /*
       * Уничтожаем Popper, если он был создан
       */
      onCleanup(() => {
        instance.destroy();
      });
    }
  });

  return () => instance();
}
