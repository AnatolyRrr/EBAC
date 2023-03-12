<template>
  <section class="personal-info">
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

      <AppMultiselect
        title="Владение языками"
        name="languages"
        :options="languages"
        :initialValues="[1, 4]"
      />

      <BaseButton type="submit">Сохранить</BaseButton>
    </form>
  </section>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useAlertsStore } from "@/stores/alerts";
import { useForm } from "vee-validate";
import { BaseButton, InputGroup, AppMultiselect } from "@/shared/ui";

export type ChangePersonalInfoFormValues = {
  username: string;
  birthday: Date;
  email: string;
  city: string;
  phone: string;
  languages: (string | number)[];
};

const { addAlert } = useAlertsStore();

const { handleSubmit } = useForm<ChangePersonalInfoFormValues>();

const languages = reactive([
  {
    value: 1,
    name: "Английский",
  },
  {
    value: 2,
    name: "Китайский",
  },
  {
    value: 3,
    name: "Японский",
  },
  {
    value: 4,
    name: "Португальский",
  },
  {
    value: 5,
    name: "Русский",
  },
  {
    value: 6,
    name: "Казахский",
  },
  {
    value: 7,
    name: "Французский",
  },
]);

const onSubmit = handleSubmit((value) => {
  console.log(value);

  addAlert({
    status: "success",
    title: "Успешно!",
    text: "Изменения сохранены",
  });
});
</script>
