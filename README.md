<p align="center">
  <img src="./assets/nativescript-preact-logo.png" alt="NativeScript Preact logo" width="440" />
</p>

<h1 align="center">NativeScript Preact</h1>

<p align="center">
  A home for Preact on native iOS and Android.
</p>

<p align="center">
  <strong>Status: Experimental prototype</strong> · <a href="https://nativescript-preact.rafaelaugusto.dev">Documentation</a> · <a href="./LICENSE">MIT License</a>
</p>

## About

NativeScript Preact is an independent community integration of Preact with NativeScript. Write JSX and use Preact state to update real native UI components on iOS and Android. No WebView.

## Project status

The first prototype includes four typed components: `Page`, `StackLayout`, `Label`, and `Button`. The demo has a counter, a reset action, and conditional mounting. Rendering uses the original Preact 11.0.1 through a small DOM-compatible adapter backed by NativeScript views.

This is an experiment, not a production release. There is no published package yet. Navigation, modals, lists, inputs, inline styles, and HMR are not supported by this prototype.

## Try the demo

Use Node.js 22, npm, the NativeScript CLI, and a configured [native development environment](https://docs.nativescript.org/setup/). iOS requires macOS and Xcode.

```sh
git clone https://github.com/rafaelaugustos/nativescript-preact.git
cd nativescript-preact
npm ci
npm run build
cd demo
npm ci
ns run android --no-hmr
```

For iOS, run `ns run ios --no-hmr` from `demo`. Rebuild the root package after changing the adapter. The demo resolves it locally through `file:..`.

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

See the [prototype guide](https://nativescript-preact.rafaelaugusto.dev/guide/prototype) for supported properties, events, and limitations.

## Documentation

Read the [project documentation](https://nativescript-preact.rafaelaugusto.dev) for the introduction, design goals, current status, and roadmap.

The website source lives in [`docs`](./docs). To work on it locally, see the [contribution guide](./CONTRIBUTING.md).

## Next steps

- Expand native component and property coverage.
- Validate more component and native lifecycle interactions.
- Explore native navigation and development tooling.

## Get involved

Ideas, use cases, and documentation improvements are welcome. Start with the [contribution guide](./CONTRIBUTING.md) or [open an issue](https://github.com/rafaelaugustos/nativescript-preact/issues) to join the discussion.

## Supporters

Supported by [Cortex Labs](https://getcortexlabs.com/).

## License

[MIT](./LICENSE) © 2026 Rafael Augusto.
