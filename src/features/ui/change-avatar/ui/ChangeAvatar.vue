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
        ref="avatarInput"
        @change="onSaveAvatarChange($event)"
      />
    </label>

    <BaseButton @click="onRemoveAvatarClick">Удалить аватар</BaseButton>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAlertsStore } from "@/stores/alerts";
import { BaseButton } from "@/shared/ui";

const { addAlert } = useAlertsStore();

const avatarImageUrl = ref("/AvatarMock.png");
const avatarInput = ref();
const allowedValues = ref(["jpg", "png"]);

const onSaveAvatarChange = (event: any) => {
  const format = event.target.value.slice(-3).toLowerCase();

  if (!allowedValues.value.includes(format) && format !== "peg") {
    addAlert({
      status: "danger",
      title: "Ошибка!",
      text: "Можно выбрать только файл изображения",
    });
  } else {
    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (e: any) => {
      avatarImageUrl.value = e.target.result;
    };

    addAlert({
      status: "success",
      title: "Успешно!",
      text: "Аватар сохранен",
    });
  }
};

const onRemoveAvatarClick = () => {
  avatarImageUrl.value = "/AvatarMock.png";
  avatarInput.value.value = "";
  
  addAlert({
    status: "success",
    title: "Успешно!",
    text: "Аватар удален",
  });
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
