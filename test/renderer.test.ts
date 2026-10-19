import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createContext, Fragment, h } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { act } from 'preact/test-utils';
import { Button, Label, Page, StackLayout } from '../src/components.js';
import { createHostRoot } from '../src/renderer.js';
import type { NativeHost } from '../src/host.js';

interface View {
  tag: string;
  children: View[];
  properties: Record<string, unknown>;
  events: Map<string, Set<(event: unknown) => void>>;
}

function fixture() {
  const host: NativeHost<View> = {
    createView(tag) {
      assert(['page', 'stackLayout', 'label', 'button'].includes(tag));
      return { tag, children: [], properties: { text: '', className: '', isEnabled: true }, events: new Map() };
    },
    insertChild(parent, child, index) {
      if (parent.tag === 'page') parent.children = [child];
      else parent.children.splice(index, 0, child);
    },
    removeChild(parent, child) {
      const index = parent.children.indexOf(child);
      if (index >= 0) parent.children.splice(index, 1);
    },
    getProperty(view, name) { return view.properties[name]; },
    setProperty(view, name, value) { view.properties[name] = value; },
    listen(view, name, callback) {
      let listeners = view.events.get(name);
      if (!listeners) view.events.set(name, listeners = new Set());
      listeners.add(callback);
      return () => listeners.delete(callback);
    },
  };
  return createHostRoot(host);
}

function tap(view: View) {
  for (const callback of view.events.get('tap') ?? []) {
    callback({ eventName: 'tap', object: view });
  }
}

test('real Preact state and context update native text without replacing the view', () => {
  const root = fixture();
  const Prefix = createContext('Count');
  let mounted = 0;
  let cleaned = 0;
  function Counter() {
    const [count, setCount] = useState(0);
    const prefix = useContext(Prefix);
    useEffect(() => {
      mounted++;
      return () => { cleaned++; };
    }, []);
    return h(StackLayout, {},
      h(Label, {}, prefix, ': ', count),
      h(Button, { text: 'Add one', onTap: () => setCount(value => value + 1) }),
    );
  }
  let view!: View;
  act(() => { view = root.render(h(Prefix.Provider, { value: 'Taps' }, h(Counter, {}))); });
  const label = view.children[0];
  const button = view.children[1];
  assert.equal(label.properties.text, 'Taps: 0');
  act(() => { tap(button); tap(button); });
  assert.equal(view.children[0], label);
  assert.equal(label.properties.text, 'Taps: 2');
  assert.equal(mounted, 1);
  act(() => root.unmount());
  assert.equal(cleaned, 1);
  assert.equal(button.events.get('tap')?.size, 0);
});

test('keyed moves retain native views and listeners, including fragments', () => {
  const root = fixture();
  const tapped: string[] = [];
  const list = (keys: string[]) => h(StackLayout, {}, h(Fragment, {},
    keys.map(key => h(Button, { key, text: key, onTap: () => tapped.push(key) })),
  ));
  let layout!: View;
  act(() => { layout = root.render(list(['a', 'b', 'c'])); });
  const [a, b, c] = layout.children;
  act(() => { root.render(list(['c', 'a', 'b'])); });
  assert.deepEqual(layout.children, [c, a, b]);
  tap(c);
  assert.deepEqual(tapped, ['c']);
  assert.equal(c.events.get('tap')?.size, 1);
  act(() => { root.render(list(['a', 'b'])); });
  assert.equal(c.events.get('tap')?.size, 0);
  act(() => root.unmount());
});

test('native boolean properties preserve false and reset to their defaults', () => {
  const root = fixture();
  let button!: View;
  act(() => { button = root.render(h(Button, { isEnabled: false, className: 'primary', text: 'Go' })); });
  assert.equal(button.properties.isEnabled, false);
  assert.equal(button.properties.className, 'primary');
  act(() => { root.render(h(Button, {})); });
  assert.equal(button.properties.isEnabled, true);
  assert.equal(button.properties.className, '');
  assert.equal(button.properties.text, '');
  act(() => root.unmount());
});

test('replacing and removing a handler never accumulates native subscriptions', () => {
  const root = fixture();
  const calls: string[] = [];
  let button!: View;
  act(() => { button = root.render(h(Button, { onTap: () => calls.push('old') })); });
  act(() => { root.render(h(Button, { onTap: () => calls.push('new') })); });
  tap(button);
  assert.deepEqual(calls, ['new']);
  assert.equal(button.events.get('tap')?.size, 1);
  act(() => { root.render(h(Button, {})); });
  assert.equal(button.events.get('tap')?.size, 0);
  act(() => root.unmount());
});

test('unmounting a conditional subtree clears refs and gives remounted components fresh state', () => {
  const root = fixture();
  const refs: unknown[] = [];
  const nativeRef = (view: unknown) => refs.push(view);
  function Counter() {
    const [value, setValue] = useState(0);
    return h(Button, { nativeRef, text: value, onTap: () => setValue(value + 1) });
  }
  const app = (visible: boolean) => h(Page, {}, visible ? h(Counter, {}) : h(Label, { text: 'Empty' }));
  let page!: View;
  act(() => { page = root.render(app(true)); });
  const original = page.children[0];
  act(() => tap(original));
  assert.equal(original.properties.text, 1);
  act(() => { root.render(app(false)); });
  assert.equal(page.children.length, 1);
  assert.equal(page.children[0].properties.text, 'Empty');
  assert.equal(original.events.get('tap')?.size, 0);
  assert.equal(refs.at(-1), null);
  act(() => { root.render(app(true)); });
  assert.notEqual(page.children[0], original);
  assert.equal(page.children[0].properties.text, 0);
  act(() => root.unmount());
});
