<template>

  <div class="row">
    <div class="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
      <settings-menu auth-prop="true"></settings-menu>
    </div>
    <div class="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
      <div class="row">
        <div class="col p-3">
          <h4>Настройки авторизации</h4>
        </div>
      </div>
      <div class="row p-2">
        <change-email></change-email>
      </div>
      <div class="row p-2">
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 p-2">
          <h5>Изменить пароль</h5>
          <form @submit="changePassword">
            <div class="row">
              <div class="col p-2">
                <label for="password" class="form-label">Старый пароль</label>
                <input type="password"
                       class="form-control"
                       id="password"
                       placeholder="Старый пароль"
                       v-model="pValue"
                       @blur="pBlur"
                >
                <small v-if="pError" class="text-danger">{{ pError }}</small>
              </div>
            </div>
            <div class="row">
              <div class="col p-2">
                <label for="password2" class="form-label">Новый пароль</label>
                <input type="password"
                       class="form-control"
                       id="password2"
                       placeholder="Новый пароль"
                       v-model="newpValue"
                       @blur="newpBlur"
                >
                <small v-if="newpError" class="text-danger">{{ newpError }}</small>
              </div>
            </div>
            <div class="row">
              <div class="col p-2">
                <button
                  class="btn bg-warning px-3"
                  :disabled="isTooAttempts || isSubmitting || pError || newpError"
                >Сохранить
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import SettingsMenu from '@/views/settings/SettingsMenu'
import {useForm, useField} from 'vee-validate'
import * as yup from 'yup'
import {computed, watch} from 'vue'
import store from '@/store'
import ChangeEmail from '@/views/settings/ChangeEmail'

export default {
  setup() {
    const {handleSubmit, submitCount, isSubmitting} = useForm()
    // Валидация для поля password
    const {value: pValue, errorMessage: pError, handleBlur: pBlur} = useField(
      'password',
      yup.string()
        .trim() // Delete spaces
        .required('Это поле обязательно')
        .min(6, 'Необходимо не менее 6 символов'), {validateOnMount: true}) // minimum 6 symbols
    // Валидация для поля password
    const {value: newpValue, errorMessage: newpError, handleBlur: newpBlur} = useField(
      'newPassword',
      yup.string()
        .trim() // Delete spaces
        .required('Это поле обязательно')
        .min(6, 'Необходимо не менее 6 символов'), {validateOnMount: true}) // minimum 6 symbols

    const changePassword = handleSubmit(async values => {
      await store.dispatch('auth/changePassword', values)
      await alert('Вы успешно поменяли пароль')
    })


    // переменная следящая за количеством попыток (5 макс)
    const isTooAttempts = computed(() => submitCount.value >= 3)
    // Баг при перезагрузке страницы теряется setTimeout
    // слежение за переменной isTooAttempts и ограничение submit при лимите(5 макс)
    watch(isTooAttempts, value => {
      if (value) {
        setTimeout(() => {
          submitCount.value = 0
        }, 1800000)
      }
    })
    return {
      pValue, pBlur, pError,
      newpValue, newpBlur, newpError,
      changePassword,
      isTooAttempts, isSubmitting,
    }
  },
  components: {
    ChangeEmail,
    SettingsMenu,
  },
}
</script>

<style scoped>

</style>