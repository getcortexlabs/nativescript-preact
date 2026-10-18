# Roadmap

This is a proposed order of work. It is not a release schedule, and later steps may change as the rendering approach is explored.

## 1. Project foundation

**Status: ready.**

The repository, MIT license, branding, contribution guide, and initial documentation provide a place to define the project and discuss its direction.

## 2. Rendering prototype

**Status: next to investigate.**

Explore the boundary between Preact rendering and NativeScript views. Keep the first example small enough to understand and validate.

The milestone should demonstrate:

- Creating and displaying a native view.
- Updating a property after a state change.
- Handling a native event.
- Adding, reordering, and removing child views.
- Unmounting and cleaning up resources.

Validate the basic flow on iOS and Android before expanding the surface.

## 3. Components and types

**Status: planned.**

Build on the selected rendering approach with a useful set of native elements and TypeScript definitions. Verify hooks, context, refs, and component lifecycle behavior.

Document supported behavior with small examples that run against the implementation.

## 4. App flows

**Status: planned.**

Explore navigation, pages, modals, and their relationship with native and component lifecycles. Use concrete app flows to decide what the integration should own and what should stay with NativeScript.

## 5. Development workflow

**Status: planned.**

Investigate project templates, bundling, debugging, and hot reload. A developer should eventually be able to create a project, run it on a device, and make changes with a documented workflow.

No bundler or hot reload integration has been selected yet.

## 6. First release

**Status: planned.**

Prepare an initial release once there is a usable and tested foundation. It should include installation instructions, a runnable example, supported versions, and a clear account of known limitations.

There is no release date yet. If a specific use case matters to you, [share it in an issue](https://github.com/rafaelaugustos/nativescript-preact/issues).
