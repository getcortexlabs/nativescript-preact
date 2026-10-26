# Try the prototype

The first example is a native counter built with Preact 11.0.1 and NativeScript 9.1.3. It has increment and reset buttons, plus a toggle that unmounts and remounts the counter.

::: warning Experimental
There is no published package. Run the demo from a local checkout. The component API is small and may change.
:::

## Run locally

Install Node.js 22, npm, the NativeScript CLI, and the [native platform tools](https://docs.nativescript.org/setup/). Android needs its SDK and a device or emulator. iOS requires macOS, Xcode, and a device or simulator.

```sh
git clone https://github.com/getcortexlabs/nativescript-preact.git
cd nativescript-preact
npm ci
npm run build
cd demo
npm ci
ns run android --no-hmr
```

For iOS, use `ns run ios --no-hmr` from `demo`.

The demo uses a local `file:..` dependency. After changing the adapter in `src`, run `npm run build` at the repository root and restart the app. HMR is not implemented for this integration.

## A small component

```tsx
import { useState } from 'preact/hooks';
import { Button, Label, Page, run, StackLayout } from 'nativescript-preact';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Page actionBarHidden>
      <StackLayout>
        <Label text={`Count: ${count}`} />
        <Button text="Add one" onTap={() => setCount(value => value + 1)} />
      </StackLayout>
    </Page>
  );
}

run(<App />);
```

`run` starts a NativeScript application with one root view. Keep that root stable while updating its children. In the demo it is a `Page` containing one `StackLayout`.

## Components

| Component | Component-specific properties |
| :--- | :--- |
| `Page` | `actionBarHidden`, one content view |
| `StackLayout` | `orientation`, child views |
| `Label` | `text`, `textWrap`, text children |
| `Button` | `text`, `onTap`, text children |

All four accept `id`, `className`, `accessibilityLabel`, `isEnabled`, `visibility`, `horizontalAlignment`, and `verticalAlignment`. Native events available on all four are `onLoaded`, `onUnloaded`, and `onLayoutChanged`.

Event handlers receive NativeScript event data. `event.object` is the NativeScript view. `nativeRef` is a callback that receives that view and receives `null` when the component is removed.

Use `className` with NativeScript CSS in `demo/src/app.css`. Inline `style` is not supported. Put text children inside `Label` or `Button`, and choose either the `text` property or text children for a given element.

## How it stays native

Preact reconciles JavaScript nodes through a small adapter. Creating a node constructs a NativeScript view; property updates and `onTap` handlers go directly to that view. NativeScript then uses Android views or UIKit controls.

The adapter implements the DOM operations this rendering path needs. It does not create a browser, render HTML, or load a WebView. HTML tags, browser component libraries, and browser APIs are not supported.

## Check the behavior

In the running app:

1. Tap **Add one** a few times and check the number changes.
2. Tap **Reset counter** and check it returns to zero.
3. Increment again, then tap **Unmount counter**.
4. Tap **Mount counter** and check the new counter starts at zero.

At the repository root, `npm test` exercises state, context, effect cleanup, native refs, property resets, event replacement, and keyed reordering using the real Preact renderer and an in-memory host. Run `npm run typecheck` inside `demo` to check its JSX.

## Limits

Only the four components above are included. Navigation, modals, form controls, virtualized lists, custom element registration, inline styles, HMR, hydration, and `preact/compat` are outside this prototype. Effects and refs follow Preact component lifecycles; native loaded and unloaded events are separate.

The adapter is pinned to Preact 11.0.1 because it depends on the renderer's DOM operations. Compatibility with other Preact versions needs testing before changing that version.
