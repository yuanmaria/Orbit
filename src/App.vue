<script setup lang="ts"></script>

<template>
  <div class="container">
    <div class="orbit">
      <!-- Orbit Background Image -->
      <img class="bg" src="/orbit/orbit-bg.png" alt="" />

      <!-- OUTER RING (clockwise) -->
      <img class="planet outer" style="--delay: 0ms" src="/orbit/item5.svg" alt="" />
      <img class="planet outer" style="--delay: -8000ms" src="/orbit/item6.svg" alt="" />
      <img class="planet outer" style="--delay: -16000ms" src="/orbit/item7.svg" alt="" />
      <img class="planet outer" style="--delay: -24000ms" src="/orbit/item8.svg" alt="" />

      <!-- INNER RING (counter-clockwise) -->
      <img class="planet inner" style="--delay: 0ms" src="/orbit/item1.svg" alt="" />
      <img class="planet inner" style="--delay: -8000ms" src="/orbit/item2.svg" alt="" />
      <img class="planet inner" style="--delay: -16000ms" src="/orbit/item3.svg" alt="" />
      <img class="planet inner" style="--delay: -24000ms" src="/orbit/item4.svg" alt="" />
    </div>
  </div>
</template>

<style>
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
  background: #001841;
  background: linear-gradient(
    180deg,
    var(--color-fill-primary-600, #004175) 0%,
    var(--color-fill-primary-900, #001841) 100%
  );
}
/* Responsive square canvas */
.orbit {
  margin: 50px;
  /* overall size scales with viewport but stays reasonable */
  --size: clamp(280px, 50vw, 820px);
  width: var(--size);
  aspect-ratio: 1 / 1;
  position: relative;

  /* animation */
  --dur: 32000ms;

  /* radii as PERCENT of the box (from your 541px SVG):
     inner r = 163  -> 30.13%
     outer r = 269.943 -> 49.88% */
  --r-inner: 30.13%;
  --r-outer: 49.88%;

  /* tiny visual nudges if needed (±1–3%) */
  --inner-nudge: 0%;
  --outer-nudge: 0%;
}

.orbit .bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain; /* your SVG/PNG scales with the box */
  pointer-events: none;
}

/* Shared icon behavior */
.planet {
  position: absolute;
  offset-rotate: 0deg; /* keep icon upright */
  offset-anchor: 50% 50%; /* path goes through icon center */

  /* Use longhand so delay isn’t reset by shorthand */
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-duration: var(--dur);
  animation-delay: var(--delay, 0ms);
}

/* OUTER ring (clockwise) — icon size scales with container */
.planet.outer {
  /* ~64px when size ≈ 541px; clamp for very small/large screens */
  --icon: clamp(32px, 11.8%, 88px);
  width: var(--icon);
  height: var(--icon);

  offset-path: circle(calc(var(--r-outer) + var(--outer-nudge)) at 50% 50%);
  animation-name: orbit-cw;
}

/* INNER ring (counter-clockwise) */
.planet.inner {
  /* ~40px at 541px; clamp for extremes */
  --icon: clamp(24px, 7.4%, 64px);
  width: var(--icon);
  height: var(--icon);

  offset-path: circle(calc(var(--r-inner) + var(--inner-nudge)) at 50% 50%);
  animation-name: orbit-ccw;
}

@keyframes orbit-cw {
  to {
    offset-distance: 100%;
  }
}
@keyframes orbit-ccw {
  to {
    offset-distance: -100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .planet {
    animation: none;
  }
}

@media screen and (max-width: 768px) {
  .orbit {
    margin: 30px;
    --size: clamp(280px, calc(100vw - 60px), 600px);
  }
}
</style>
