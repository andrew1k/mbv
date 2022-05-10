<template>
  <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
    <h5>Изменить email</h5>
    <form @submit="changeEmail">
      <div class="row p-2">
        <label for="email" class="form-label">Введите новый Email</label>
        <input type="text"
               class="form-control"
               id="email"
               v-model="eValue"
               @blur="eBlur"
        >
        <small v-if="eError" class="text-danger">{{eError}}</small>
      </div>
      <div class="row py-2">
        <div class="col">
          <button
              class="btn bg-warning px-3"
              :disabled="eError || isSubmitting"
          >Сохранить</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import store from "@/store";
import {useField, useForm} from "vee-validate";
import * as yup from "yup";


export default {
  setup() {
    const {handleSubmit, isSubmitting} = useForm()
    // Валидация для поля email
    const {value: eValue, errorMessage: eError, handleBlur: eBlur} = useField(
        'email',
        yup.string()
            .trim()
            .required('Это поле обязательно')
            .email('Необходимо ввести корректный email'), {initialValue: localStorage.getItem('email'), validateOnMount: true}) // именно email
    const changeEmail = handleSubmit(async values => {
      if (values.email === localStorage.getItem('email')) {
        alert('Данный email уже существует')
      } else {
      await store.dispatch('auth/changeEmail', values)
      }
    })
    return {
      eValue,eBlur,eError,
      changeEmail, isSubmitting
    }
  }
}
</script>

<style scoped>

</style>