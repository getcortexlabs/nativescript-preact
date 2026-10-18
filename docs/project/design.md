# Design goals

The architecture is still open. These goals provide a starting point for evaluating a rendering prototype and discussing tradeoffs.

## Keep the UI native

The intended output is a tree of NativeScript UI components. Layout, input, and interaction should use the native platform through NativeScript.

Native controls have their own properties, events, and lifecycle. The integration should make those differences clear rather than imply that an HTML element maps directly to a mobile control.

## Keep Preact recognizable

The goal is to preserve familiar component composition, JSX, state, hooks, and context where they fit the native environment.

Behavior needs to be verified in a prototype. In particular, effect cleanup, refs, updates, and unmounting must be checked against native view lifecycles before documenting support.

## Make the boundary explicit

The integration needs a clear division of responsibilities:

| Layer | Intended responsibility |
| --- | --- |
| Preact | Components, state, and component updates |
| Integration | Translate rendering work into native views, properties, and events |
| NativeScript | Native UI components, platform runtime, and native API access |

This describes the direction, not an implemented architecture. The rendering strategy has not been selected.

## Start with a small surface

A few elements and a basic interaction are enough to investigate the first rendering path. Adding a large catalog before that path is understood would make correctness harder to assess.

The first prototype should answer:

- How are native views created, inserted, reordered, and removed?
- How do property changes and event handlers reach a view?
- What happens when component state changes?
- When do effects run, and how are resources cleaned up?
- Can the same behavior be demonstrated on both iOS and Android?

## Keep types close to native behavior

Typed JSX should help developers discover native element properties and event payloads. It should also expose platform differences when they matter.

The exact element names, prop types, and extension API remain undecided.

## Let evidence shape the tooling

Development tooling, navigation, and hot reload belong on the [roadmap](/project/roadmap). Their design should follow a working renderer and real app flows.

Performance claims and compatibility guarantees will need measurements and native testing. There are no benchmarks or supported-version promises at this stage.
