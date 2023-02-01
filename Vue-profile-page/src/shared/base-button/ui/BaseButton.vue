<template>
  <button class="base-btn">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.base-btn {
  @include subtitle-one-styles;
  color: $base-white;
  background: $main-primary;
  width: 100%;
  height: 40px;
  border: 0;
  border-radius: 5px;
  box-shadow: 0 4px 12px rgba(42, 166, 92, 0.4);
  cursor: pointer;

  @include MIN_1200 {
    height: 48px;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:hover {
    background: $base-spanish-viridian;
  }
}
</style>
