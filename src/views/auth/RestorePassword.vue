<template>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="mb-md-5 mt-md-4 pb-5">
          <form class="card bg-white text-black" @submit.prevent="onSubmit">
            <ul class="nav nav-pills nav-justified mt-2">
              <li class="nav-item mx-3">
                <h4 class="nav-link text-black text-start">Забыли пароль?</h4>
              </li>
            </ul>
            <div class="my-3 card-body">
              <label class="form-label" for="email">Напишите ваш Email, и мы отправим ссылку восстановления</label>
              <input
                  class="form-control"
                  id="email"
                  placeholder="Email"
                  type="email"
                  v-model="eValue"
                  @blur="eBlur">
              <small v-if="eError">{{ eError }}</small>
            </div>
            <div class="row">

            <div class="col">
            <button class="btn text-black px-4 mx-3 bg-warning" type="submit" :disabled="isSubmitting">Отправить</button>
            </div>
            </div>
            <div class="m-3 pt-3">
              <h5 >Вы так же можете
                <router-link to="/login" class="text-black">Войти</router-link>
                или
                <router-link to="/signup" class="text-black">Зарегистрироваться</router-link>
              </h5>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useField, useForm} from "vee-validate";
import * as yup from "yup";
import store from "@/store";
import {useRouter} from "vue-router";

export default {
  setup() {
    const router = useRouter()
    const {handleSubmit, isSubmitting} = useForm()
    const {value: eValue, errorMessage: eError, handleBlur: eBlur} = useField(
        'email',
        yup.string()
            .trim() // Delete spaces
            .required('Это поле обязательно')
            .email('Необходимо ввести корректный email')) // именно email
    const onSubmit = handleSubmit(async values => {
      await router.push('/restoreMessageSent')
      await store.dispatch('auth/forgotPassword', values)
    })
    return {
      eValue, eError, eBlur,
      onSubmit, isSubmitting,
    }
  }
}
</script>

<style scoped>

</style>