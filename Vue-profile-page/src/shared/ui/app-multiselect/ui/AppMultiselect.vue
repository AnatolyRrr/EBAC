<template>
  <div class="multiselect-wrapper">
    <div
      :class="{ 'backdrop-transparent': isOpenOptions }"
      @click="isOpenOptions = false"
    />

    <div class="multiselect" :class="{ 'multiselect--active': isOpenOptions }">
      <h5 class="multiselect__title" @click="isOpenOptions = !isOpenOptions">
        {{ title }}
      </h5>

      <div
        class="select"
        :class="{ 'select--active': isOpenOptions }"
        @click="isOpenOptions = !isOpenOptions"
      >
        <div class="select__values">
          <div
            v-for="(name, index) in selectedNames"
            :key="index"
            class="select__values__item"
          >
            <p>{{ name }}</p>

            <CloseIcon
              class="select__values__item__remove-icon"
              @click.stop="selectedValues.splice(index, 1)"
            />
          </div>

          <input
            type="text"
            class="select__search-input"
            placeholder="Поиск"
            v-model="searchValue"
            @click.stop="!isOpenOptions ? (isOpenOptions = true) : null"
          />
        </div>

        <div class="select__arrow-icon">^</div>
      </div>

      <span class="multiselect__error">{{ errorMessage }}</span>
    </div>

    <div v-show="isOpenOptions" class="options">
      <div
        v-for="(option, index) in filteredOptions"
        :key="index"
        class="options__item"
        :class="{
          'options__item--active': selectedValues.includes(option.value),
          'options__item--empty': option.value === '',
        }"
        @click="onSelectOptionClick(option.value)"
      >
        <p>{{ option.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed, reactive } from "vue";
import { useField } from "vee-validate";
import CloseIcon from "@/app/icons/CloseIcon.vue";

export type SelectedValueType = Array<string | number>;

export type OptionType = {
  value: number | string;
  name: string;
};

export type MultiselectProps = {
  title: string;
  required?: boolean;
  initialValues?: SelectedValueType;
  options: OptionType[];
};

const props = defineProps<MultiselectProps>();

const isOpenOptions = ref(false);
const selectedValues = reactive<SelectedValueType>([]);
const searchValue = ref<string>("");

onMounted(() => {
  if (props.initialValues?.length) {
    selectedValues.push(...props.initialValues);
  }
});

const { value: formValue, errorMessage } = useField("languages", () => {
  if (props.required && selectedValues.length === 0) {
    return "Поле не может быть пустым";
  }

  return true;
});

watch(selectedValues, () => {
  formValue.value = selectedValues;
});

const selectedNames = computed(() => {
  const arrayNames: string[] = [];

  selectedValues.forEach((value) => {
    const index = props.options.findIndex((option) => {
      return option.value === value ? true : false;
    });

    arrayNames.push(props.options[index].name);
  });

  return arrayNames;
});

const onSelectOptionClick = (optionValue: string | number) => {
  if (!selectedValues.includes(optionValue)) {
    selectedValues.push(optionValue);
  } else {
    const index = selectedValues.findIndex((value) => {
      return value === optionValue ? true : false;
    });

    selectedValues.splice(index, 1);
  }
};

const filteredOptions = computed(() => {
  if (searchValue.value.length > 0) {
    const filteredValues = props.options.filter((option) => {
      return option.name
        .toLowerCase()
        .includes(searchValue.value.toLowerCase());
    });

    if (filteredValues.length) {
      return filteredValues;
    } else {
      return [
        {
          value: "",
          name: "Ничего не найдено",
        },
      ];
    }
  }

  return props.options;
});
</script>

<style scoped lang="scss">
.multiselect-wrapper {
  position: relative;

  .backdrop-transparent {
    @include size(100%);
    z-index: 3;
    position: fixed;
    top: 0;
    left: 0;
  }

  .multiselect {
    position: relative;

    &--active {
      z-index: 4;
    }

    &__title {
      margin-bottom: 2px;

      @include MIN_1200 {
        margin-bottom: 4px;
      }
    }

    .select {
      display: flex;
      justify-content: space-between;
      padding: 12px 12px 4px;
      box-shadow: 0 12px 16px rgba(0, 0, 0, 0.02);
      border: 1px solid $base-grey-blue;
      border-radius: 5px;
      min-height: 40px;

      @include MIN_1200 {
        min-height: 48px;
      }

      &--active {
        border-radius: 5px 5px 0 0;
      }

      &__values {
        display: flex;
        flex-wrap: wrap;

        &__item {
          display: flex;
          align-items: center;
          width: max-content;
          margin-right: 8px;
          margin-bottom: 8px;
          background: $main-primary;
          color: $base-white;
          padding: 8px;
          border-radius: 5px;
          box-shadow: 0 4px 12px rgba(42, 166, 92, 0.4);

          &__remove-icon {
            @include size(18px);
            cursor: pointer;
            margin-left: 8px;
          }
        }
      }

      &__search-input {
        @include size(140px, 36px);
        border-radius: 5px;
        padding: 0 12px;
        box-shadow: 0 12px 16px rgba(0, 0, 0, 0.02);
        border: 1px solid $base-grey-blue;

        @include MIN_1200 {
          @include size(160px, 36px);
        }
      }

      &__arrow-icon {
        transform: rotate(-180deg);
        font-size: 2rem;
        height: min-content;
        font-weight: 600;
      }
    }

    &__error {
      @include footnote-one-styles;
      color: $status-error;
    }
  }

  .options {
    box-shadow: 0 12px 16px rgba(0, 0, 0, 0.1);
    border: 1px solid $base-grey-blue;
    border-radius: 0 0 5px 5px;
    position: absolute;
    z-index: 4;
    width: 100%;
    max-height: calc(32px * 5);
    background: $base-white;
    overflow: auto;

    &__item {
      padding: 6px 12px;

      &:hover {
        background: $main-primary;
        color: $base-white;
      }

      &--active {
        background: $main-primary;
        color: $base-white;
      }

      &--empty {
        cursor: not-allowed;
      }
    }
  }
}
</style>
