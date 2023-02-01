<template>
  <div class="background-green">
    <div class="container">
      <header class="container__fill header">
        <h1 class="header__title">MyProfile</h1>
      </header>
    </div>
  </div>
</template>

<style scoped lang="scss">
.background-green {
  background: $main-primary;
}
header {
  height: 80px;
  display: flex;
  align-items: center;

  .header__title {
    color: $base-white;
  }
}
</style>
