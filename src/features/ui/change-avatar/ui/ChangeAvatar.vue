<template>
  <section class="card-layout form avatar">
    <h3 class="form__title">Изменение аватара</h3>

    <img :src="avatarImageUrl" alt="User avatar" class="avatar__image" />

    <label for="avatar" class="avatar__change">
      <span class="avatar__change__text"> Изменить аватар </span>

      <input
        type="file"
        name="avatar"
        id="avatar"
        class="avatar__change__input"
        @change="onSaveAvatarChange($event)"
      />
    </label>

    <BaseButton @click="onRemoveAvatarClick">Удалить аватар</BaseButton>

    <AppAlert
      :isOpen="isOpenAlert"
      :status="isError ? 'error' : 'success'"
      @close="isOpenAlert = false"
    >
      {{ alertMessage }}
    </AppAlert>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { AppAlert, BaseButton } from "@/shared/ui";

const isOpenAlert = ref(false);
const isError = ref(false);
const alertMessage = ref("");
const avatarImageUrl = ref("/AvatarMock.png");
const timeoutId = ref();

const allowedValues = ref(["jpg", "png"]);

const onSaveAvatarChange = (event: any) => {
  isError.value = false;
  const format = event.target.value.slice(-3).toLowerCase();

  if (!allowedValues.value.includes(format) && format !== "peg") {
    isError.value = true;
    alertMessage.value = "Можно выбрать только файл изображения";
  } else {
    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (e: any) => {
      avatarImageUrl.value = e.target.result;
    };

    alertMessage.value = "Аватар сохранен";
  }

  showAlert();
};

const onRemoveAvatarClick = () => {
  isError.value = false;
  alertMessage.value = "Аватар удален";
  avatarImageUrl.value = "/AvatarMock.png";

  showAlert();
};

const showAlert = () => {
  clearInterval(timeoutId.value);

  isOpenAlert.value = true;

  timeoutId.value = setTimeout(() => {
    isOpenAlert.value = false;
  }, 2000);
};
</script>

<style scoped lang="scss">
.avatar {
  &__image {
    width: 200px;
    height: auto;
    border-radius: 12px;
    margin: 0 auto;
  }

  &__change {
    color: $base-white;
    background: $main-primary;
    width: 100%;
    height: 40px;
    border: 0;
    border-radius: 5px;
    box-shadow: 0 4px 12px rgba(42, 166, 92, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    @include MIN_1200 {
      height: 48px;
    }

    &:hover {
      background: $base-spanish-viridian;
    }

    &__text {
      @include subtitle-one-styles;
    }

    &__input {
      display: none;
    }
  }
}
</style>
