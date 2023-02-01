<template>
  <div class="wrapper">
    <div class="container">
      <main class="container__fill card-layout profile-detail" @submit="onSubmit">
        <ChangePersonalInfo />
        <ChangePassword />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChangePassword, ChangePersonalInfo } from '@/features';
</script>

<style scoped lang="scss">
.container__fill {
  @include MIN_768 {
    grid-column: 2 / span 6;
  }
  @include MIN_1200 {
    grid-column: 4 / span 6;
  }
}

.profile-detail {
  margin: 12px 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 12px;

  @include MIN_1200 {
    margin: 16px 0;
    grid-gap: 16px;
  }
}
</style>
