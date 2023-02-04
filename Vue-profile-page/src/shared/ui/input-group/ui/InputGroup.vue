<template>
  <div class="input-group">
    <label :for="id" class="input-group__title">{{ title }}</label>

    <div class="input-wrapper">
      <Field
        v-if="type === 'tel'"
        :name="name + 'CodeCountry'"
        as="select"
        class="input-group__phone-code"
        v-model="phoneCode"
        @change="inputValue = ''"
      >
        <option v-for="(option, index) in options" :key="index" :value="option">
          {{ option }}
        </option>
      </Field>

      <Field
        :type="type === 'password' ? passwordInputType : type"
        :name="name"
        :id="id"
        :maxlength="maxLength"
        v-model="inputValue"
        :placeholder="placeholder"
        :rules="rules"
        class="input-group__input"
      />

      <EyeIcon
        v-if="type === 'password'"
        :color="passwordInputType === 'text' ? colors.Main.Primary : colors.Base.GreyBlue"
        @mousedown="passwordInputType = 'text'"
        @mouseup="passwordInputType = 'password'"
        class="input-group__eye-icon"
      />
    </div>

    <ErrorMessage :name="name" as="span" class="input-group__error" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useMask } from "@/shared/lib/composables/useMask";
import { Field, ErrorMessage } from "vee-validate";
import EyeIcon from "@/app/icons/EyeIcon.vue";
import { colors } from "@/app/styles";

export type InputGroupProps = {
  title: string;
  type: string;
  name: string;
  id: string;
  rules: string;
  placeholder?: string;
  initialValue?: any;
  maxLength?: string;
  codeCountry?: string;
};

const props = defineProps<InputGroupProps>();

const mask = useMask();

const inputValue = ref(props.initialValue ? props.initialValue : "");
const phoneCode = ref(props.codeCountry ? props.codeCountry : "+55");
const passwordInputType = ref('password');
const options = ref(["+7", "+55", "+996"]);

watch(inputValue, () => {
  if (props.type === "tel") {
    inputValue.value = mask.phoneMask(inputValue.value, phoneCode.value);
  }
});
</script>

<style scoped lang="scss">
.input-group {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2px;

  @include MIN_1200 {
    grid-gap: 4px;
  }

  &__title {
    @include subtitle-two-styles;
  }

  .input-wrapper {
    width: 100%;
    display: flex;
    position: relative;
  }

  &__phone-code {
    width: 140px;
    margin-right: 4px;
    border-radius: 5px;
    padding: 0 0 0 12px;
    box-shadow: 0 12px 16px rgba(0, 0, 0, 0.02);
    border: 1px solid $base-grey-blue;
  }

  &__input {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    padding: 0 12px;
    box-shadow: 0 12px 16px rgba(0, 0, 0, 0.02);
    border: 1px solid $base-grey-blue;

    @include MIN_1200 {
      height: 48px;
    }
  }

  &__error {
    @include footnote-one-styles;
    color: $status-error;
  }

  &__eye-icon {
    position: absolute;
    right: 12px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
}
</style>
