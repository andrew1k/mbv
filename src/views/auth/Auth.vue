<template>
  <form class="card" @submit.prevent="onSubmit">
    <h3>Войти</h3>
    <div :class="['form-control', {invalid: eError}]">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="eValue" @blur="eBlur">
      <small v-if="eError">{{ eError }}</small>
    </div>
    <div :class="['form-control', {invalid: pError}]">
      <label for="password">Пароль</label>
      <input type="password" id="password" v-model="pValue" @blur="pBlur">
      <small v-if="pError">{{ pError }}</small>
    </div>
    <button class="btn primary" type="submit" :disabled="isSubmitting || isTooAttempts">Войти</button>
    <span class="text-danger" v-if="isTooAttempts">Вы слишком часто пытаетесь войти в систему, попробуйте позже</span>
  </form>
</template>

<script>

import {useStore} from "vuex";
import {useField, useForm} from "vee-validate";
import * as yup from "yup";
import {computed, watch} from "vue";

export default {
  setup() {
    const store = useStore()
    const {handleSubmit, isSubmitting, submitCount} = useForm()
    const {value: eValue, errorMessage: eError, handleBlur: eBlur} = useField(
        'email',
        yup.string()
            .trim()
            .required('Это поле обязательно')
            .email('Необходимо ввести корректный email'))
    const {value: pValue, errorMessage: pError, handleBlur: pBlur} = useField(
        'password',
        yup.string()
            .trim()
            .required('Это поле обязательно')
            .min(6, 'Необходимо не менее 6 символов'))
    const onSubmit = handleSubmit(async values => {
      await store.dispatch('auth/login', values)
    })
    const isTooAttempts = computed(() => submitCount.value >= 5)
    watch(isTooAttempts, value => {if (value){setTimeout(() => {submitCount.value = 0}, 1800000)}})
    return {
      eValue, eError ,eBlur, pValue, pError, pBlur,
      onSubmit, isSubmitting,
      isTooAttempts,
    }
  }
}
</script>

<style scoped>

</style>