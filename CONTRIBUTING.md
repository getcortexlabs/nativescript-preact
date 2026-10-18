# Contributing

Thanks for your interest in NativeScript Preact.

The project is in the planning stage. This repository contains the documentation website, branding, and repository configuration. There is no framework implementation or NativeScript app setup yet.

## Ways to help

- Share use cases and expectations for a Preact integration with NativeScript.
- Discuss technical approaches and tradeoffs in issues.
- Improve the documentation or report anything unclear.

Before starting implementation work, open an issue to discuss the scope and direction with the maintainer.

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
