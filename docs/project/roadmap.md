# Roadmap

This is a proposed order of work. It is not a release schedule, and later steps may change as the rendering approach is explored.

## 1. Project foundation

**Status: ready.**

The repository, MIT license, branding, contribution guide, and initial documentation provide a place to define the project and discuss its direction.

## 2. Rendering prototype

**Status: experimental implementation available.**

The first adapter and counter demo connect Preact to native views. See [Try the prototype](/guide/prototype) for the local setup and limits.

The implementation covers:

- Creating and displaying a native view.
- Updating a property after a state change.
- Handling a native event.
- Adding, reordering, and removing child views.
- Unmounting and cleaning up resources.

Validate the basic flow on iOS and Android before expanding the surface.

## 3. Components and types

**Status: started with four components.**

Build on the selected rendering approach with a useful set of native elements and TypeScript definitions. Verify hooks, context, refs, and component lifecycle behavior.

Document supported behavior with small examples that run against the implementation.

## 4. App flows

**Status: planned.**

Explore navigation, pages, modals, and their relationship with native and component lifecycles. Use concrete app flows to decide what the integration should own and what should stay with NativeScript.

## 5. Development workflow

**Status: planned.**

Investigate project templates, bundling, debugging, and hot reload. A developer should eventually be able to create a project, run it on a device, and make changes with a documented workflow.

The local demo uses NativeScript's webpack tooling. Dedicated HMR support and a distributable app template remain to be designed.

## 6. First release

**Status: planned.**

Prepare an initial release once there is a usable and tested foundation. It should include installation instructions, a runnable example, supported versions, and a clear account of known limitations.

There is no release date yet. If a specific use case matters to you, [share it in an issue](https://github.com/getcortexlabs/nativescript-preact/issues).
