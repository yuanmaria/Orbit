<script setup lang="ts"></script>

<template>
  <div class="container">
    <router-view />
  </div>
</template>

<style>
:root {
  color-scheme: light;
}

body {
  display: flex;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

#app {
  width: 100%;
  height: 100vh;
  background: linear-gradient(180deg, #004175 0%, #001841 100%);
}

/* === Responsive orbit container === */
.orbit {
  margin: 50px;
  --size: clamp(280px, 50vw, 820px);
  width: var(--size);
  aspect-ratio: 1 / 1;
  position: relative;

  /* animation timing */
  --dur: 32000ms;

  /* radii (percent of the box, from SVG) */
  --r-inner: 30.13%;
  --r-outer: 49.88%;

  /* minor nudges if needed */
  --inner-nudge: 0%;
  --outer-nudge: 0%;

  /* calculate offset */
  --outer-offset: calc(var(--r-outer) + var(--outer-nudge));
  --inner-offset: calc(var(--r-inner) + var(--inner-nudge));

  color-scheme: light; /* prevent system dark mode from inverting colors */
}

/* Orbit background */
.orbit .bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
}

/* === Shared icon behavior === */
.planet {
  position: absolute;
  offset-rotate: 0deg;
  -webkit-offset-rotate: 0deg;
  offset-anchor: 50% 50%;
  -webkit-offset-anchor: 50% 50%;

  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-duration: var(--dur);
  will-change: offset-distance, transform;
}

/* === Outer ring (clockwise) === */
.planet.outer {
  --icon: clamp(32px, 11.8%, 88px);
  width: var(--icon);
  height: var(--icon);
  offset-path: circle(var(--outer-offset) at 50% 50%);
  -webkit-offset-path: circle(var(--outer-offset) at 50% 50%);
  animation-name: orbit-cw;
}

/* === Inner ring (counter-clockwise) === */
.planet.inner {
  --icon: clamp(24px, 7.4%, 64px);
  width: var(--icon);
  height: var(--icon);
  offset-path: circle(var(--inner-offset) at 50% 50%);
  -webkit-offset-path: circle(var(--inner-offset) at 50% 50%);
  animation-name: orbit-ccw;
}

/* === Keyframes with per-icon phase === */
@keyframes orbit-cw {
  from {
    offset-distance: var(--phase);
    -webkit-offset-distance: var(--phase);
  }
  to {
    offset-distance: calc(var(--phase) + 100%);
    -webkit-offset-distance: calc(var(--phase) + 100%);
  }
}

@keyframes orbit-ccw {
  from {
    offset-distance: var(--phase);
    -webkit-offset-distance: var(--phase);
  }
  to {
    offset-distance: calc(var(--phase) - 100%);
    -webkit-offset-distance: calc(var(--phase) - 100%);
  }
}

/* === Reduced motion preference === */
@media (prefers-reduced-motion: reduce) {
  .planet {
    animation: none;
  }
}

/* === Small screens === */
@media screen and (max-width: 768px) {
  .orbit {
    margin: 30px;
    --size: clamp(260px, calc(100vw - 60px), 600px);
  }
}
</style>
