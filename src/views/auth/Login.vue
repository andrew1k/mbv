<template>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="mb-md-5 mt-md-4 pb-5">
          <form class="card bg-white text-white" @submit.prevent="onSubmit">
            <ul class="nav nav-pills nav-justified mt-2">
              <li class="nav-item mx-3">
                <h4 class="nav-link text-black active bg-warning">Войти</h4>
              </li>
              <li class="nav-item mx-3">
              <h4>
                <router-link to="/signup" class="nav-link text-dark">Создать аккаунт</router-link>
              </h4>
              </li>
            </ul>
            <div class="card-body p-4">
              <div class="form-outline py-2 my-4">
                <MDBInput label="Email" type="email" v-model="eValue" @blur="eBlur" />
<!--                <input-->
<!--                    class="form-control"-->
<!--                    type="email"-->
<!--                    id="email"-->
<!--                    placeholder="Email"-->
<!--                    v-model="eValue"-->
<!--                    @blur="eBlur">-->
<!--                <label class="form-label" for="email">Email</label>-->
                <small v-if="eError" class="text-danger">{{ eError }}</small>
              </div>

              <div class="form-outline py-2 my-4">
                <MDBInput label="Пароль" type="password" v-model="pValue" @blur="pBlur" />
<!--                <input-->
<!--                    class="form-control"-->
<!--                    type="password"-->
<!--                    id="password"-->
<!--                    placeholder="Пароль"-->
<!--                    v-model="pValue"-->
<!--                    @blur="pBlur">-->
<!--                <label class="form-label" for="password">Пароль</label>-->
                <small v-if="pError" class="text-danger">{{ pError }}</small>
              </div>
              <div class="row align-items-end align-content-end text-end mb-0">
                <!-- отключается во время isSubmitting и при многом повторении -->
                <div class="col text-start">
                <button class="btn text-black px-4 bg-warning" type="submit" :disabled="isSubmitting || isTooAttempts || pError || eError">
                  Войти
                </button>
                </div>
                <div class="col">
                <span>
                  <router-link to="/restorePassword" class="text-black fw-bold">Забыли пароль?</router-link>
                </span>
                </div>
              </div>
              <div>
                <span class="text-danger" v-if="isTooAttempts">Вы слишком часто пытаетесь войти в систему, попробуйте позже</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {useField, useForm} from "vee-validate";
import * as yup from "yup";
import {computed, watch} from "vue";
import {MDBInput} from 'mdb-vue-ui-kit'


export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const {handleSubmit, isSubmitting, submitCount} = useForm()
    // Валидация для поля email
    const {value: eValue, errorMessage: eError, handleBlur: eBlur} = useField(
        'email',
        yup.string()
            .trim() // Delete spaces
            .required('Это поле обязательно')
            .email('Необходимо ввести корректный email')) // именно email

    // Валидация для поля password
    const {value: pValue, errorMessage: pError, handleBlur: pBlur} = useField(
        'password',
        yup.string()
            .trim() // Delete spaces
            .required('Это поле обязательно')
            .min(6, 'Необходимо не менее 6 символов')) // minimum 6 symbols

    // при submit выполняется handleSubmit валидирующий формы на соответствие требованиям
    const onSubmit = handleSubmit(async values => {
      // dispatch для выполнения actions в store/index.js
      // выполняется auth/login и передаются данные с форм в values
      await store.dispatch('auth/login', values)
      // При успешном входе роут на главную страницу
      await router.push('/')
    })

    // переменная следящая за количеством попыток (5 макс)
    const isTooAttempts = computed(() => submitCount.value >= 5)

    // Баг при перезагрузке странице теряется setTimeout
    // слежение за переменной isTooAttempts и ограничение submit при лимите(5 макс)
    watch(isTooAttempts, value => {
      if (value) {
        setTimeout(() => {
          submitCount.value = 0
        }, 1800000)
      }
    })
    return {
      eValue, eError, eBlur, pValue, pError, pBlur,
      onSubmit, isSubmitting,
      isTooAttempts,
    }
  }, components: {
    MDBInput,
  }
}
</script>

<style scoped>

</style>