<template>
  <div class="project-home">
    <section class="home-hero" aria-labelledby="home-title">
      <div class="hero-copy">
        <a class="project-status" href="/guide/status">
          <span class="status-dot" aria-hidden="true"></span>
          Experimental prototype
          <span aria-hidden="true">↗</span>
        </a>
        <p class="eyebrow">NATIVESCRIPT + PREACT</p>
        <h1 id="home-title">A native home<br />for <span>Preact.</span></h1>
        <p class="hero-description">
          Your component model. A new place to build.
          Exploring Preact for native iOS and Android apps, powered by NativeScript.
        </p>
        <div class="hero-actions">
          <a class="primary-link" href="/guide/prototype">Try the prototype <span aria-hidden="true">→</span></a>
          <a class="secondary-link" href="https://github.com/getcortexlabs/nativescript-preact">
            View on GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
        <p class="hero-note">Independent. Open source. Just getting started.</p>
      </div>
      <div class="hero-visual">
        <div class="logo-stage">
          <span class="stage-label">FAMILIAR IDEAS. NATIVE POSSIBILITIES.</span>
          <img
            class="hero-logo"
            src="/logo.png"
            width="1254"
            height="1254"
            alt="NativeScript Preact: a layered purple and mint P with the project wordmark"
            fetchpriority="high"
          />
          <div class="stage-platforms" aria-label="Target platforms">
            <span>iOS</span>
            <span class="platform-divider" aria-hidden="true"></span>
            <span>Android</span>
          </div>
        </div>
      </div>
    </section>

    <section class="idea-section" aria-labelledby="idea-title">
      <div class="section-heading">
        <p class="eyebrow">THE IDEA</p>
        <h2 id="idea-title">From components to native views.</h2>
        <p>A small adapter connects Preact to real native controls.</p>
      </div>
      <ol class="native-path">
        <li>
          <span class="path-number">01</span>
          <div><h3>Preact</h3><p>Components, JSX, and state</p></div>
          <span class="path-arrow" aria-hidden="true">→</span>
        </li>
        <li>
          <span class="path-number">02</span>
          <div><h3>NativeScript</h3><p>Native UI and platform access</p></div>
          <span class="path-arrow" aria-hidden="true">→</span>
        </li>
        <li>
          <span class="path-number">03</span>
          <div><h3>iOS + Android</h3><p>A home on both platforms</p></div>
        </li>
      </ol>
      <p class="idea-note">The first renderer is here. The API is experimental. <a href="/project/design">Read the design goals <span aria-hidden="true">↗</span></a></p>
    </section>

    <section class="explore-section" aria-labelledby="explore-title">
      <div class="explore-main">
        <p class="eyebrow">START HERE</p>
        <h2 id="explore-title">Get to know the project.</h2>
        <div class="reading-list">
          <a href="/guide/">
            <span><strong>Introduction</strong><small>What we're building toward, and why.</small></span>
            <span class="reading-arrow" aria-hidden="true">↗</span>
          </a>
          <a href="/project/design">
            <span><strong>Design goals</strong><small>The principles and questions shaping the work.</small></span>
            <span class="reading-arrow" aria-hidden="true">↗</span>
          </a>
          <a href="/project/contributing">
            <span><strong>Join the conversation</strong><small>Bring a use case, an idea, or a better explanation.</small></span>
            <span class="reading-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <aside class="progress-panel" aria-labelledby="progress-title">
        <div class="progress-heading">
          <h2 id="progress-title">Where things stand</h2>
          <span class="planning-label">Prototype</span>
        </div>
        <p>Four native components and a counter demo. State, tap events, and conditional mounting with Preact.</p>
        <ol class="milestone-list">
          <li class="milestone-ready"><span aria-hidden="true">✓</span><div><strong>Project foundation</strong><small>Repository, branding, and documentation</small></div></li>
          <li class="milestone-ready"><span aria-hidden="true">✓</span><div><strong>Rendering prototype</strong><small>A native counter you can run locally</small></div></li>
          <li><span aria-hidden="true">3</span><div><strong>Components and app flows</strong><small>Planned after the rendering foundation</small></div></li>
        </ol>
        <a class="roadmap-link" href="/project/roadmap">Follow the roadmap <span aria-hidden="true">→</span></a>
      </aside>
    </section>
  </div>
</template>
