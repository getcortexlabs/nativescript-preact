# Project status

NativeScript Preact has an experimental rendering prototype. It is available from a local checkout and is not ready for production apps.

## Available now

- The original Preact 11.0.1 renderer connected to NativeScript 9.1.3 views.
- Typed `Page`, `StackLayout`, `Label`, and `Button` components.
- A counter demo with state updates, native tap events, reset, and conditional mounting.
- Native CSS through `className` and callback refs through `nativeRef`.
- Tests for state, context, effects, refs, event cleanup, property resets, and keyed reordering using an in-memory host.
- An MIT license, documentation, and contribution guidance.

Use the [prototype guide](/guide/prototype) to run the app and review the supported API.

The counter flow was checked on an Android API 36 emulator and an iOS 26 simulator: increment, reset, unmount, and remount with fresh state. This is a basic smoke check, not broad device or lifecycle coverage.

## Still ahead

| Area | Status |
| --- | --- |
| Rendering adapter | Experimental |
| Native elements, properties, and events | Four components with a limited API |
| Hooks, context, refs, and component lifecycle | Basic paths tested; broader native coverage needed |
| TypeScript and JSX types | Available for the four components |
| Navigation and modals | Planned |
| Development tooling and app templates | Planned |
| Installable release from this project | Not available |

The table describes the intended scope. It does not promise an API, a release date, or compatibility with a particular framework version.

## What to expect next

The next step is to expand native component coverage and validate more lifecycle scenarios before introducing navigation or additional development tooling.

That work will help determine the architecture before the project expands into navigation or development tooling. See the [roadmap](/project/roadmap) for the proposed sequence.

## Following progress

The [repository](https://github.com/getcortexlabs/nativescript-preact) is the source of truth for implementation work. Use [issues](https://github.com/getcortexlabs/nativescript-preact/issues) to discuss requirements and open questions.

The prototype is pinned to Preact 11.0.1. Compatibility with other Preact versions needs testing before changing that version.
