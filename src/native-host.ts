import { Button, ContentView, Label, LayoutBase, Page, StackLayout, View } from '@nativescript/core';
import type { NativeHost } from './host.js';

const elements = { page: Page, stackLayout: StackLayout, label: Label, button: Button };
const events: Record<string, string> = {
  tap: 'tap',
  loaded: 'loaded',
  unloaded: 'unloaded',
  layoutchanged: 'layoutChanged',
};

export const nativeHost: NativeHost<View> = {
  createView(tag) {
    const Type = elements[tag as keyof typeof elements];
    if (!Type) throw new Error(`Unsupported native element: ${tag}`);
    return new Type();
  },
  insertChild(parent, child, index) {
    if (parent instanceof LayoutBase) {
      parent.insertChild(child, index);
    } else if (parent instanceof ContentView) {
      parent.content = child;
    } else {
      throw new Error(`${parent.typeName} cannot contain native child views.`);
    }
  },
  removeChild(parent, child) {
    if (parent instanceof LayoutBase) {
      parent.removeChild(child);
    } else if (parent instanceof ContentView && parent.content === child) {
      (parent as { content: View | null }).content = null;
    }
  },
  getProperty(view, name) {
    return (view as unknown as Record<string, unknown>)[name === 'class' ? 'className' : name];
  },
  setProperty(view, name, value) {
    const property = name === 'class' ? 'className' : name;
    (view as unknown as Record<string, unknown>)[property] =
      property === 'text' && value != null ? String(value) : value;
  },
  listen(view, name, callback) {
    const nativeEvent = events[name];
    if (!nativeEvent) throw new Error(`Unsupported native event: ${name}`);
    view.on(nativeEvent, callback);
    return () => view.off(nativeEvent, callback);
  },
};
