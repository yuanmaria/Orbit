<script lang="ts" setup>
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
  <div class="orbit" ref="orbitRef">
    <img class="bg" src="/orbit/orbit-bg.png" alt="" />

    <!-- OUTER (clockwise) -->
    <img class="planet outer" style="--phase: 0%" src="/orbit/item5.svg" alt="" />
    <img class="planet outer" style="--phase: 25%" src="/orbit/item6.svg" alt="" />
    <img class="planet outer" style="--phase: 50%" src="/orbit/item7.svg" alt="" />
    <img class="planet outer" style="--phase: 75%" src="/orbit/item8.svg" alt="" />

    <!-- INNER (counter-clockwise) -->
    <img class="planet inner" style="--phase: 0%" src="/orbit/item1.svg" alt="" />
    <img class="planet inner" style="--phase: 25%" src="/orbit/item2.svg" alt="" />
    <img class="planet inner" style="--phase: 50%" src="/orbit/item3.svg" alt="" />
    <img class="planet inner" style="--phase: 75%" src="/orbit/item4.svg" alt="" />
  </div>

  <span style="color: white">device version is {{ getIOSMajor() ?? 'not iOS' }}</span>
</template>

<style scoped></style>
