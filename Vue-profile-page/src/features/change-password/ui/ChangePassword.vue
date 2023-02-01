<template>
  <form class="card-layout form" @submit="onSubmit">
    <h3 class="form__title">Изменение пароля</h3>

    <InputGroup
      title="Текущий пароль"
      name="currentPassword"
      id="currentPassword"
      type="password"
      rules="required"
    />

    <InputGroup
      title="Новый пароль"
      name="newPassword"
      id="newPassword"
      type="password"
      rules="required|unconfirmed:currentPassword"
    />

    <InputGroup
      title="Подтверждение пароля"
      name="confirmPassword"
      id="confirmPassword"
      type="password"
      rules="required|confirmed:newPassword"
    />

    <BaseButton type="submit">Сохранить</BaseButton>

    <AppAlert
      :isOpen="isOpenAlert"
      status="success"
      @close="isOpenAlert = false"
    >
      Пароль сохранен
    </AppAlert>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useForm } from "vee-validate";
import { BaseButton, InputGroup, AppAlert } from "@/shared";

export type ChangePasswordFormValue = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const { handleSubmit } = useForm<ChangePasswordFormValue>();

const isOpenAlert = ref(false);

const showAlert = () => {
  isOpenAlert.value = true;

  setTimeout(() => {
    isOpenAlert.value = false;
  }, 2000);
};

const onSubmit = handleSubmit((value) => {
  console.log(value);
  showAlert();
});
</script>
