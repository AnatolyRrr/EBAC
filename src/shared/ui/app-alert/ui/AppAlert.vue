<template>
  <Teleport to="body">
    <div class="container">
      <TransitionGroup name="alert" tag="div" class="alerts container__fill">
        <div
          v-for="alert in alerts"
          :key="alert.id"
          class="alerts__item"
          :class="'alerts__item_' + alert.status"
        >
          <p class="alerts__item__title">{{ alert.title }}</p>

          <p class="alerts__item__text">{{ alert.text }}</p>

          <CloseIcon
            class="alerts__item__close-btn"
            @click="removeAlert(alert.id)"
          />
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useAlertsStore } from "@/stores/alerts";
import CloseIcon from "@/app/icons/CloseIcon.vue";

const { alerts, removeAlert } = useAlertsStore();
</script>

<style scoped lang="scss">
.container {
  position: fixed;
  top: 40px;
  left: 0;
  right: 0;
  margin: 0 auto;
}

.container__fill {
  @include MIN_768 {
    grid-column: 3 / span 4;
  }

  @include MIN_1200 {
    grid-column: 4 / span 6;
  }
}

.alerts {
  display: flex;
  flex-direction: column-reverse;
  gap: 8px;
  position: relative;

  &__item {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 8px 12px;
    color: $base-white;
    border-radius: 5px;

    &_success {
      background: $status-access;
    }

    &_danger {
      background: $status-error;
    }

    &__title {
      @include subtitle-two-styles;
      margin-right: 8px;
    }

    &__close-btn {
      margin-left: auto;
      cursor: pointer;
    }
  }
}

.alert-move,
.alert-enter-active,
.alert-leave-active {
  transition: all 0.5s ease;
}

.alert-enter-from,
.alert-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.alert-leave-active {
  position: absolute;
}
</style>
