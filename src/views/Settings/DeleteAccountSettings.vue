<template>
  <div class="m-2 p-2 bg-light" style="border-radius: 8px">
    <div class="row p-2">
      <div class="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
        <settings-menu del-prop="true"></settings-menu>
      </div>
      <div class="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
        <div class="row">
          <div class="col px-3">
            <h4>Удаление аккаунта</h4>
          </div>
        </div>
        <div class="row p-2">
          <form @submit.prevent="deleteAccount">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 py-2">
              <label for="email" class="form-label">Введите Email</label>
              <input type="text"
                     class="form-control"
                     id="email"
                     v-model="eValue"
                     @blur="eBlur"
              >
              <small v-if="eError" class="text-danger">{{ eError }}</small>
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 py-2">
              <label for="password" class="form-label">Пароль</label>
              <input type="password"
                     class="form-control"
                     id="password"
                     placeholder="Старый пароль"
                     v-model="pValue"
                     @blur="pBlur"
              >
              <small v-if="pError" class="text-danger">{{ pError }}</small>
            </div>
            <div class="row p-2">
              <div class="col">
                <button class="btn bg-danger px-3" type="submit">Удалить</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SettingsMenu from "@/views/Settings/SettingsMenu";
import {useField, useForm} from "vee-validate";
import * as yup from "yup";
import store from "@/store";
import router from "@/router";

export default {
  setup() {
    const {handleSubmit} = useForm()
    // Валидация для поля email
    const {value: eValue, errorMessage: eError, handleBlur: eBlur} = useField(
        'email',
        yup.string()
            .trim()
            .required('Это поле обязательно')
            .email('Необходимо ввести корректный email'), {
          initialValue: localStorage.getItem('email'),
          validateOnMount: true
        })
    // Валидация для поля password
    const {value: pValue, errorMessage: pError, handleBlur: pBlur} = useField(
        'password',
        yup.string()
            .trim() // Delete spaces
            .required('Это поле обязательно')
            .min(6, 'Необходимо не менее 6 символов'), {validateOnMount: true}) // minimum 6 symbols
    const deleteAccount = handleSubmit(async values => {
      await store.dispatch('auth/deleteAccount', values)
      await router.push('/')
    })
    return {
      eValue, eError, eBlur,
      pValue, pError, pBlur,
      deleteAccount
    }
  },
  components: {
    SettingsMenu,
  }
}
</script>

<style scoped>

</style>