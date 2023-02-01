<template>
  <Teleport to="body">
    <Transition name="alert">
      <div v-if="isOpen" class="wrapper">
        <div class="container">
          <div class="container__fill alert" :class="status">
            <h4 class="alert__content">
              <slot />
            </h4>

            <CloseIcon @click="$emit('close')" class="alert__close-btn" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import CloseIcon from "@/app/icons/CloseIcon.vue";

export type AlertProps = {
  status: "error" | "success";
  isOpen: boolean;
};

defineProps<AlertProps>();
defineEmits(["close"]);
</script>

<style scoped lang="scss">
.wrapper {
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
.alert {
  width: 100%;
  height: 50px;
  color: $base-white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  position: relative;

  &__close-btn {
    position: absolute;
    right: 12px;
    top: 0;
    bottom: 0;
    margin: auto 0;
    cursor: pointer;

    @include MIN_1200 {
      right: 16px;
    }
  }
}

.success {
  background: $status-access;
}

.error {
  background: $status-error;
}

.alert-enter-active,
.alert-leave-active {
  transition: all 0.5s ease;
}

.alert-enter-from,
.alert-leave-to {
  opacity: 0;
  transform: translate3d(0px, -100%, 0px);
}
</style>
