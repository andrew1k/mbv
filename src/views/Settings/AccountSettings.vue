<template>
  <div class="m-2 p-2 bg-white" style="border-radius: 8px">
    <div class="row p-2">
      <div class="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
        <settings-menu acc-prop="true"></settings-menu>
      </div>
      <div class="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
        <div class="row">
          <div class="col px-3">
            <h4>Настройки профиля</h4>
            <p>Вы можете добавить информацию о себе или изменить существующую</p>
          </div>
        </div>
        <form @submit="onSubmit">
          <div class="row p-2">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <label for="firstName" class="form-label">Имя</label>
              <input type="text"
                     class="form-control"
                     id="firstName"
                     v-model="firstNameValue"
                     @blur="firstNameBlur"
              >
              <small v-if="firstNameError" class="text-danger">{{firstNameError}}</small>
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <label for="secondName" class="form-label">Фамилия</label>
              <input type="text"
                     class="form-control"
                     id="secondName"
                     :placeholder="secondName"
                     v-model="secondNameValue"
                     @blur="secondNameBlur"
              >
              <small v-if="secondNameError" class="text-danger">{{secondNameError}}</small>
            </div>
          </div>
          <div class="row p-2">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <label for="phoneNumber" class="form-label">Телофон</label>
              <input type="text"
                     class="form-control"
                     id="phoneNumber"
                     v-model="phoneNumberValue"
                     @blur="phoneNumberBlur"
              >
              <small v-if="phoneNumberError" class="text-danger">{{phoneNumberError}}</small>
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <label for="birthDate" class="form-label">Дата рождения</label>
              <input type="date"
                     class="form-control"
                     id="birthDate"
                     v-model="birthDateValue"
                     @blur="birthDateBlur"
                     >
              <small v-if="birthDateError" class="text-danger">{{birthDateError}}</small>
            </div>
          </div>
          <div class="row p-2">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" disabled v-model="email">
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
            </div>
          </div>
          <div class="row p-2">
            <div class="col">
              <button class="btn bg-warning px-3" type="submit">Сохранить</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import SettingsMenu from '@/views/Settings/SettingsMenu'
import {useField, useForm} from "vee-validate";
import * as yup from "yup";
import store from "@/store";

export default {
  setup() {
    const firstName =  localStorage.getItem('first-name')
    const email = localStorage.getItem('email')
    const secondName = localStorage.getItem('second-name')
    const phoneNumber = localStorage.getItem('phone-number')
    const birthDate = ("" + (new Date(+(localStorage.getItem('birth-date')))).toISOString()).replace(/^([^T]+)T(.+)$/, '$1')
    const {handleSubmit} = useForm()
    // Валидация для поля fistName
    const {value: firstNameValue, errorMessage: firstNameError, handleBlur: firstNameBlur} = useField(
        'firstName',
        yup.string()
            .trim()
            .required('Это поле обязательно'), {initialValue: firstName})
    // Валидация для поля secondName
    const {value: secondNameValue, errorMessage: secondNameError, handleBlur: secondNameBlur} = useField(
        'secondName',
        yup.string()
            .trim()
            .required('Это поле обязательно'), {initialValue: secondName})
    const {value: phoneNumberValue, errorMessage: phoneNumberError, handleBlur: phoneNumberBlur} = useField(
        'phoneNumber',
        yup.string()
            .trim() // Delete spaces
            .required('Это поле обязательно'), {initialValue: phoneNumber ? phoneNumber : '+7'})
    // // Валидация для поля
    const {value: birthDateValue, errorMessage: birthDateError, handleBlur: birthDateBlur} = useField(
        'birthDate',
        yup.date().required('Это поле обязательно'), {initialValue: birthDate})

    const onSubmit = handleSubmit(async values => {
      await store.dispatch('auth/updateData', values)
      await alert('Данные успешно обновлены')
    })



    return {
      firstName, secondName, phoneNumber, birthDate, email,
      firstNameValue, firstNameError, firstNameBlur,
      secondNameValue, secondNameError, secondNameBlur,
      birthDateValue, birthDateError, birthDateBlur,
      phoneNumberValue, phoneNumberError, phoneNumberBlur,
      onSubmit,
    }
  }, components: {
    SettingsMenu,
  },
}
</script>

<style scoped>

</style>