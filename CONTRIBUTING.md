# Contributing

Thanks for your interest in NativeScript Preact.

The project has a small experimental renderer and a native counter demo. The API is still evolving.

## Ways to help

- Share use cases and expectations for a Preact integration with NativeScript.
- Discuss technical approaches and tradeoffs in issues.
- Improve the documentation or report anything unclear.

For substantial additions, open an issue to discuss the scope and direction with the maintainer.

## Renderer and demo

Use Node.js 22 and npm. From the repository root:

```sh
npm ci
npm test
npm run build
cd demo
npm ci
npm run typecheck
ns run android --no-hmr
```

Use `ns run ios --no-hmr` for iOS. Native builds require the [NativeScript development environment](https://docs.nativescript.org/setup/). Rebuild the root package after adapter changes, then restart the demo; renderer HMR is not implemented.

Tests use the real Preact renderer with an in-memory host to check reconciliation, events, state, refs, and cleanup. Changes to native view behavior also need an emulator or device check. In the demo, verify increment, reset, unmount, and remount with fresh state.

## Documentation changes

1. Keep changes focused and write project documentation in English.
2. Check Markdown formatting, relative links, and image paths.
3. Open a pull request explaining what changed and why.

Describe proposed capabilities as plans until they are implemented and verified.

## Run the documentation locally

Use Node.js 22 and npm. The website dependencies are kept inside `docs`.

```sh
cd docs
npm ci
npm run dev
```

Before submitting changes, check the production build:

```sh
npm run build
npm run preview
```

Check navigation, search, links, and both color themes. For layout changes, include a narrow screen in your review.

GitHub Actions builds documentation pull requests for validation. Changes to the docs on `main` are published to [nativescript-preact.rafaelaugusto.dev](https://nativescript-preact.rafaelaugusto.dev).
