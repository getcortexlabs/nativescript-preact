import { Application } from '@nativescript/core';
import type { ComponentChildren } from 'preact';
import { nativeHost } from './native-host.js';
import { createHostRoot } from './renderer.js';

export { Page, StackLayout, Label, Button } from './components.js';
export type { ViewProps, PageProps, StackLayoutProps, LabelProps, ButtonProps } from './components.js';

export function createRoot() {
  return createHostRoot(nativeHost);
}

export function run(component: ComponentChildren): void {
  Application.run({
    create() {
      const root = createRoot();
      const view = root.render(component);
      Application.once(Application.exitEvent, () => root.unmount());
      return view;
    },
  });
}
