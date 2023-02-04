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

      <AppAlert
        :isOpen="isOpenAlert"
        status="success"
        @close="isOpenAlert = false"
      >
        Изменения сохранены
      </AppAlert>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useForm } from "vee-validate";
import { BaseButton, InputGroup, AppAlert, AppMultiselect } from "@/shared/ui";

export type ChangePersonalInfoFormValues = {
  username: string;
  birthday: Date;
  email: string;
  city: string;
  phone: string;
  languages: (string | number)[];
};

const { handleSubmit } = useForm<ChangePersonalInfoFormValues>();

const isOpenAlert = ref(false);

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
