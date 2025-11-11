<script lang="ts" setup></script>

<template>
  <div class="orbit" ref="orbitRef">
    <img class="bg" src="/orbit/orbit-bg.png" alt="" />

    <!-- OUTER RING (clockwise) -->
    <img class="planet outer" style="--phase: 0%" src="/orbit/item5.svg" alt="" />
    <img class="planet outer" style="--phase: 25%" src="/orbit/item6.svg" alt="" />
    <img class="planet outer" style="--phase: 50%" src="/orbit/item7.svg" alt="" />
    <img class="planet outer" style="--phase: 75%" src="/orbit/item8.svg" alt="" />

    <!-- INNER RING (counter-clockwise) -->
    <img class="planet inner" style="--phase: 0%" src="/orbit/item1.svg" alt="" />
    <img class="planet inner" style="--phase: 25%" src="/orbit/item2.svg" alt="" />
    <img class="planet inner" style="--phase: 50%" src="/orbit/item3.svg" alt="" />
    <img class="planet inner" style="--phase: 75%" src="/orbit/item4.svg" alt="" />
  </div>
</template>

<style scoped></style>
