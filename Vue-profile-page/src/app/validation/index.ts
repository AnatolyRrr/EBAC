import { defineRule } from "vee-validate";

defineRule("fullName", (value: string) => {
  if (!value || !value.length) {
    return true;
  }

  if (
    !/^([\s]+)?[a-zа-яА-Я]([-a-zа-яА-Я]+)((\s+[-a-zа-яА-Я]+[a-zа-яА-Я]?){1,2})?([\s]+)?$/i.test(
      value
    )
  ) {
    return "Введите верное значение. Поле может содержать только буквы, пробел и дефис";
  }

  return true;
});

defineRule("required", (value: string) => {
  if (!value || !value.length) {
    return "Поле не заполнено";
  }
  return true;
});

defineRule("email", (value: string) => {
  if (!value || !value.length) {
    return true;
  }

  if (!/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/.test(value)) {
    return "Введите верное значение. Пример: example@gmail.com";
  }

  return true;
});

defineRule("date", (value: string) => {
  if (!value || !value.length || value.length === 10) {
    return true;
  }

  if (value.length > 0 && (value.length < 10 || value.length > 10)) {
    return "Введена недействительная дата";
  }

  return true;
});

defineRule("confirmed", (value: string, [target]: any, ctx) => {
  if (value === ctx.form[target]) {
    return true;
  }
  return "Пароли не совпадают";
});

defineRule("unconfirmed", (value: string, [target]: any, ctx) => {
  if (value === ctx.form[target]) {
    return "Новый пароль не должен совпадать с текущим";
  }
  return true;
});