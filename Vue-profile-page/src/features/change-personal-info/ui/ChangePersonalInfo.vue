<template>
  <form class="card-layout form" @submit="onSubmit">
    <h3 class="form__title">Персональная информация</h3>

    <InputGroup
      title="ФИО"
      name="username"
      id="username"
      type="text"
      rules="required|fullName"
    />

    <InputGroup
      title="Дата рождения"
      name="birthday"
      id="birthday"
      type="date"
      rules="date"
    />

    <InputGroup
      title="E-mail"
      name="email"
      id="email"
      type="email"
      placeholder="example@gmail.com"
      rules="required|email"
    />

    <InputGroup
      title="Город"
      name="city"
      id="city"
      type="text"
      placeholder=""
      rules=""
    />

    <InputGroup
      title="Номер телефона"
      name="phone"
      id="phone"
      type="tel"
      rules=""
    />

    <AppMultiselect />

    <BaseButton type="submit">Сохранить</BaseButton>

    <AppAlert
      :isOpen="isOpenAlert"
      status="success"
      @close="isOpenAlert = false"
    >
      Изменения сохранены
    </AppAlert>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useForm } from "vee-validate";
import { BaseButton, InputGroup, AppAlert, AppMultiselect } from "@/shared";

export type ChangePersonalInfoFormValue = {};

const { handleSubmit } = useForm<ChangePersonalInfoFormValue>();

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
