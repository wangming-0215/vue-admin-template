import type { PiniaPluginContext } from 'pinia';

export default function logger(context: PiniaPluginContext) {
  window.console.log(context.store.$id);

  context.store.$onAction(({ name }) => {
    window.console.log(`action '${`${context.store.$id}.${name}`}' dispatched`);
  });
}
