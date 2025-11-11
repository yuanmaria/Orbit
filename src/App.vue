<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const orbitRef = ref<HTMLElement | null>(null)
let ro: ResizeObserver | null = null

function getIOSMajor(): number | null {
  const ua = navigator.userAgent
  const isTouchMac = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1
  const isiOSDevice = /iP(hone|od|ad)/.test(ua) || isTouchMac
  if (!isiOSDevice) return null

  // iOS & iPadOS usually expose "OS 16_6 like Mac OS X"
  const m = ua.match(/OS (\d+)[._]/)
  return m && m[1] ? parseInt(m[1], 10) : null
}

onMounted(() => {
  const el = orbitRef.value!
  const iosMajor = getIOSMajor()

  if (iosMajor && iosMajor <= 16) {
    // mark as legacy to switch CSS rules
    el.classList.add('ios-legacy')

    const update = () => {
      const size = el.clientWidth // square box (aspect-ratio:1)
      // your % radii turned into px (49.88% and 30.13% from your SVG)
      const rOuter = size * 0.4988
      const rInner = size * 0.3013
      const center = size / 2

      el.style.setProperty('--r-outer-px', `${rOuter}px`)
      el.style.setProperty('--r-inner-px', `${rInner}px`)
      el.style.setProperty('--cx', `${center}px`)
      el.style.setProperty('--cy', `${center}px`)
    }

    ro = new ResizeObserver(update)
    ro.observe(el)
    update()
  }
})

onBeforeUnmount(() => {
  ro?.disconnect()
})
</script>

<template>
  <div class="container">
    <router-view />
    device is {{ getIOSMajor() ?? 'not iOS' }}
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
/* your existing responsive rules stay the same … */
.orbit {
  --size: clamp(280px, 50vw, 820px);
  width: var(--size);
  aspect-ratio: 1 / 1;
  position: relative;
  margin: 50px;

  --dur: 32000ms;
  --r-inner: 30.13%;
  --r-outer: 49.88%;
  --inner-nudge: 0%;
  --outer-nudge: 0%;
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
  animation-duration: var(--dur);
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  will-change: offset-distance, transform;
}

/* Default (modern browsers): percent radii */
.planet.outer {
  --icon: clamp(32px, 11.8%, 88px);
  width: var(--icon);
  height: var(--icon);
  offset-path: circle(calc(var(--r-outer) + var(--outer-nudge)) at 50% 50%);
  -webkit-offset-path: circle(calc(var(--r-outer) + var(--outer-nudge)) at 50% 50%);
  animation-name: orbit-cw;
}
.planet.inner {
  --icon: clamp(24px, 7.4%, 64px);
  width: var(--icon);
  height: var(--icon);
  offset-path: circle(calc(var(--r-inner) + var(--inner-nudge)) at 50% 50%);
  -webkit-offset-path: circle(calc(var(--r-inner) + var(--inner-nudge)) at 50% 50%);
  animation-name: orbit-ccw;
}

/* iOS ≤ 16 override: px radii + px center (set via JS) */
.orbit.ios-legacy .planet.outer {
  offset-path: circle(var(--r-outer-px) at var(--cx) var(--cy));
  -webkit-offset-path: circle(var(--r-outer-px) at var(--cx) var(--cy));
}
.orbit.ios-legacy .planet.inner {
  offset-path: circle(var(--r-inner-px) at var(--cx) var(--cy));
  -webkit-offset-path: circle(var(--r-inner-px) at var(--cx) var(--cy));
}

/* Keyframes (phase-based; iOS-friendly) */
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

/* reduced motion */
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
