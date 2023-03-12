<template>
  <section class="change-password">
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
    </form>
  </section>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { useAlertsStore } from "@/stores/alerts";
import { BaseButton, InputGroup } from "@/shared/ui";

export type ChangePasswordFormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const { addAlert } = useAlertsStore();

const { handleSubmit } = useForm<ChangePasswordFormValues>();

const onSubmit = handleSubmit((value) => {
  console.log(value);

  addAlert({
    status: "success",
    title: "Успешно!",
    text: "Пароль изменен",
  });
});
</script>
