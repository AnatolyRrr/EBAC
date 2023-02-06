<template>
  <div class="background-grey">
    <div class="container">
      <footer class="container__fill footer">
        <h3 class="footer__title">MyProfile</h3>
        <p class="footer__footnote">2023 © MyProfile. All rights reserved.</p>
      </footer>
    </div>
  </div>
</template>

<style scoped lang="scss">
.background-grey {
  background: $base-grey-blue;
  margin-top: auto;
}

.footer {
  height: 80px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-bottom: 12px;

  &__footnote {
    @include footnote-one-styles;
  }
}
</style>
