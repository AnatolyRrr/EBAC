<template>
  <div class="layout-default">
    <TheHeader />
    <slot />
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { TheHeader, TheFooter } from "@/widgets";
</script>

<style scoped lang="scss">
.layout-default {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>