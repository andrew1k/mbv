<template>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="mb-md-5 mt-md-4 pb-5">
          <form class="card bg-white text-white" @submit.prevent="onSubmit">
            <ul class="nav nav-pills nav-justified mt-2">
              <li class="nav-item mx-3">
                <h4>
                  <router-link to="/login" class="nav-link text-dark">Войти</router-link>
                </h4>
              </li>
              <li class="nav-item mx-3">
                <h4 class="nav-link text-dark active bg-warning">
                  Создать аккаунт
                </h4>
              </li>
            </ul>
            <div class="card-body p-4">
              <div class="my-3">
              <small class="text-danger" v-if="firstNameError">{{ firstNameError }}</small>
              <input
                  class="form-control"
                  type="text"
                  id="firstName"
                  placeholder="Имя"
                  v-model="firstNameValue"
                  @blur="firstNameBlur">
              <label class="text-black form-label" for="firstName">Ваше имя</label>
              </div>

            <div class="my-3">
              <small v-if="secondNameError" class="text-danger">{{ secondNameError }}</small>
              <input
                  class="form-control"
                  type="text"
                  id="secondName"
                  placeholder="Фамилия"
                  v-model="secondNameValue"
                  @blur="secondNameBlur">
              <label for="secondName" class="text-black">Ваша фамилия</label>
            </div>
            <div class="my-3">
              <small v-if="birthDateError" class="text-danger">{{ birthDateError }}</small>
              <input
                  class="form-control"
                  type="date"
                  id="birthDate"
                  v-model="birthDateValue"
                  @blur="birthDateBlur">
              <label for="birthDate" class="text-black">Ваш день рождения</label>
            </div>
            <div class="my-3">
              <small v-if="eError" class="text-danger">{{ eError }}</small>
              <input
                  class="form-control"
                  type="email"
                  id="email"
                  placeholder="Email"
                  v-model="eValue"
                  @blur="eBlur">
              <label for="email" class="text-black">Ваш Email</label>
            </div>
            <div class="my-3">
              <small v-if="pError" class="text-danger">{{ pError }}</small>
              <input
                  class="form-control"
                  type="password"
                  id="password"
                  placeholder="Пароль"
                  v-model="pValue"
                  @blur="pBlur">
              <label for="password" class="text-black">Придумайте пароль</label>
            </div>
<!--              <div class="form-check d-flex mb-4">-->
<!--                <input class="form-check-input me-2"-->
<!--                       type="checkbox"-->
<!--                       id="registerCheck"-->
<!--                       v-model="checked"-->
<!--                       aria-describedby="registerCheckHelpText" />-->
<!--                <label class="form-check-label text-black" for="registerCheck">-->
<!--                  Я даю согласие на хранение и обработку данных-->
<!--                </label>-->
<!--              </div>-->

            <button class="btn text-black px-4 bg-warning" type="submit" :disabled="birthDateError || eError || pError || firstNameError || secondNameError">Зарегистрироваться</button>

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

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const {handleSubmit, isSubmitting} = useForm()
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
    // Валидация для поля fistName
    const {value: firstNameValue, errorMessage: firstNameError, handleBlur: firstNameBlur} = useField(
        'firstName',
        yup.string()
            .trim() // Delete spaces
            .required('Это поле обязательно'))
    // Валидация для поля secondName
    const {value: secondNameValue, errorMessage: secondNameError, handleBlur: secondNameBlur} = useField(
        'secondName',
        yup.string()
            .trim() // Delete spaces
            .required('Это поле обязательно'))
    // Валидация для поля dateOfBirth
    const {value: birthDateValue, errorMessage: birthDateError, handleBlur: birthDateBlur} = useField(
        'birthDate',
        yup.date().required('Это поле обязательно'))



    // const {checked} = useField('checkbox', undefined, {type:'checkbox', checkedValue:false, uncheckedValue:false, validateOnMount:true})
    // console.log(checked)



    const onSubmit = handleSubmit(async values => {
      await store.dispatch('auth/signup', values)
      await router.push('/')
    })
    return {
      eValue, eError, eBlur, pValue, pError, pBlur,
      firstNameValue, firstNameError, firstNameBlur,
      secondNameValue, secondNameError, secondNameBlur,
      birthDateValue, birthDateError, birthDateBlur,
      onSubmit, isSubmitting,

    }
  }
}
</script>

<style scoped>

</style>