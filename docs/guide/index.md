# Introduction

NativeScript Preact is an independent community project exploring how to build native iOS and Android apps with Preact and NativeScript.

The first prototype uses Preact components, JSX, and state to describe interfaces made from NativeScript UI components. NativeScript provides the platform runtime and native views. The app interface does not use a WebView.

::: info Experimental prototype
A native counter demo and four typed components are available in the repository. There is no published package yet. Start with the [prototype guide](/guide/prototype).
:::

## Why this project?

Preact offers a component model that many JavaScript developers already know. NativeScript provides a way to work with native mobile UI from JavaScript and TypeScript. This project explores how those two pieces could fit together.

The aim is a focused integration that can be maintained independently, with a clear boundary between Preact's component model and NativeScript's native UI.

## What we're aiming for

- **Native interfaces.** Render NativeScript UI components on iOS and Android, without using a WebView for the application interface.
- **Familiar components.** Preserve the way developers compose components and manage state in Preact where the native environment allows it.
- **Useful types.** Make native element properties and events discoverable through TypeScript and JSX.
- **A practical app workflow.** Work toward navigation, lifecycle handling, and tooling after a small rendering prototype is validated.

The [prototype guide](/guide/prototype) lists the supported components and limitations. The [design goals](/project/design) explain the architecture and remaining questions.

## What you can do today

Run the [counter demo](/guide/prototype), read the [project status](/guide/status), follow the [roadmap](/project/roadmap), or [share a use case](/project/contributing).

The demo is intended for local evaluation. A production package and app template are still ahead.

## Related projects

If either technology is new to you, the official documentation is a useful starting point:

- [Preact](https://preactjs.com/)
- [NativeScript](https://docs.nativescript.org/)

This repository is maintained by [Rafael Augusto](https://github.com/rafaelaugustos) as an independent project.

## Supporters

Supported by [Cortex Labs](https://getcortexlabs.com/).
