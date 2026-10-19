# Design goals

The prototype connects Preact's existing renderer to NativeScript through a small DOM-compatible adapter. Its public API remains experimental.

## Keep the UI native

The output is a tree of NativeScript UI components. Layout and interaction use the native platform through NativeScript. No browser or WebView is created.

Native controls have their own properties, events, and lifecycle. The integration should make those differences clear rather than imply that an HTML element maps directly to a mobile control.

## Keep Preact recognizable

The goal is to preserve familiar component composition, JSX, state, hooks, and context where they fit the native environment.

Tests exercise state, context, effect cleanup, refs, updates, and unmounting with the real Preact renderer and an in-memory host. Native lifecycle coverage will need to grow as more components and app flows are added.

## Make the boundary explicit

The integration needs a clear division of responsibilities:

| Layer | Intended responsibility |
| --- | --- |
| Preact | Components, state, and component updates |
| Integration | Translate rendering work into native views, properties, and events |
| NativeScript | Native UI components, platform runtime, and native API access |

The adapter gives Preact nodes with operations such as `createElementNS`, `insertBefore`, and `remove`. Those operations create and update NativeScript views. An `ownerDocument` on each root keeps the adapter local instead of installing a browser-like global document. This is a small rendering compatibility layer, not a full DOM implementation.

## Start with a small surface

A few elements and a basic interaction are enough to investigate the first rendering path. Adding a large catalog before that path is understood would make correctness harder to assess.

The prototype focuses on:

- How are native views created, inserted, reordered, and removed?
- How do property changes and event handlers reach a view?
- What happens when component state changes?
- When do effects run, and how are resources cleaned up?
- Can the same behavior be demonstrated on both iOS and Android?

## Keep types close to native behavior

Typed JSX should help developers discover native element properties and event payloads. It should also expose platform differences when they matter.

The initial typed components are `Page`, `StackLayout`, `Label`, and `Button`. Native view access uses a `nativeRef` callback. A public custom element registration API has not been added.

## Let evidence shape the tooling

Development tooling, navigation, and hot reload belong on the [roadmap](/project/roadmap). Their design should follow a working renderer and real app flows.

Performance claims and compatibility guarantees will need measurements and native testing. There are no benchmarks or supported-version promises at this stage.
