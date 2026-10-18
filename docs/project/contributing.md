# Contributing

The project is at the beginning. Use cases, technical discussion, and clear documentation are the most useful contributions right now.

## Share a use case

[Open an issue](https://github.com/rafaelaugustos/nativescript-preact/issues) describing what you would like to build. Useful details include the target platforms, native components involved, and the interaction you need.

Concrete examples help shape the scope. A short description of a screen or navigation flow is enough to start a discussion.

## Discuss implementation ideas

Before starting framework implementation, open an issue to discuss the scope and direction with the maintainer.

For a technical proposal, explain the problem, the approach you want to explore, and how you would check it on a device. The rendering strategy and public API are still undecided.

## Improve the documentation

Documentation lives in the `docs` directory and is built with [VitePress](https://vuejs.github.io/vitepress/v1/).

Use Node.js 22 and npm. From a local checkout:

```sh
cd docs
npm ci
npm run dev
```

Open the local address printed by VitePress. To check the production build:

```sh
npm run build
npm run preview
```

These commands run the documentation website. There is no NativeScript app or framework development setup yet.

## Before opening a pull request

- Keep the change focused and explain why it helps.
- Write project documentation in English.
- Describe capabilities as planned until they are implemented and verified.
- Check links and the production build after editing the docs.
- For layout changes, check a narrow screen and both color themes.

You can use the edit link on each page to find its source on GitHub.

## Publishing

Documentation changes pushed to `main` are built by GitHub Actions and published to [nativescript-preact.rafaelaugusto.dev](https://nativescript-preact.rafaelaugusto.dev). Pull requests build the site for validation without publishing it.

## License

The project uses the [MIT license](https://github.com/rafaelaugustos/nativescript-preact/blob/main/LICENSE).
