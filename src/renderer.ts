import { render, type ComponentChildren } from 'preact';
import { NativeDocument, NativeElement } from './dom.js';
import type { NativeHost } from './host.js';

export function createHostRoot<View extends object>(host: NativeHost<View>) {
  const document = new NativeDocument(host);
  const container = new NativeElement(document, '#root', null);
  const target = container as unknown as Parameters<typeof render>[1];

  return {
    render(component: ComponentChildren): View {
      render(component, target);
      const children = container.childNodes.filter(node => node.nativeView);
      if (children.length !== 1) throw new Error('A native root must render exactly one view.');
      return children[0].nativeView!;
    },
    unmount(): void {
      render(null, target);
    },
  };
}
