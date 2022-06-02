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
              <div class="my-5">
                <MDBInput label="Ваше имя" type="text" v-model="firstNameValue" @blur="firstNameBlur"/>
                <small class="text-danger" v-if="firstNameError">{{ firstNameError }}</small>
              </div>

              <div class="my-5 ">
                <MDBInput label="Ваша фамилия" type="text" v-model="secondNameValue" @blur="secondNameBlur"/>
                <small v-if="secondNameError" class="text-danger">{{ secondNameError }}</small>
              </div>
              <div class="my-5">
                <MDBInput label="День рождения" type="date" v-model="birthDateValue" @blur="birthDateBlur"/>
                <small v-if="birthDateError" class="text-danger">{{ birthDateError }}</small>
              </div>
              <div class="my-5">
                <MDBInput label="Ваш Email" type="email" v-model="eValue" @blur="eBlur"/>
                <small v-if="eError" class="text-danger">{{ eError }}</small>
              </div>
              <div class="my-5">
                <MDBInput label="Придумайте пароль" type="password" v-model="pValue" @blur="pBlur"/>
                <small v-if="pError" class="text-danger">{{ pError }}</small>
              </div>
              <div class="my-5 text-black">
                <MDBRadio
                    label="Мужчина"
                    name="personGender"
                    v-model="personGenderValue"
                    value="1"
                />
                <MDBRadio
                    label="Женщина"
                    name="personGender"
                    v-model="personGenderValue"
                    value="2"
                />
              </div>
              <div class="my-5 text-black">
                <MDBCheckbox label="Согласен" v-model="checkbox" id="checkbox" wrapperClass="mb-3 mb-md-0"/>
              </div>

              <button class="btn text-black px-4 bg-warning" type="submit"
                      :disabled="birthDateError || eError || pError || firstNameError || secondNameError || !checkbox">
                Зарегистрироваться
              </button>

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
import {MDBInput, MDBCheckbox, MDBRadio} from 'mdb-vue-ui-kit';
import {ref} from "vue";

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
    // Валидация для поля о гендере
    const {value: personGenderValue, errorMessage: personGenderError} = useField(
        'personGender',
        yup.number().required('Это поле обязательно'), {initialValue: 1})
    // Валидация правил и условий
    const checkbox = ref(false)
    // Обработка Submit события
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
      personGenderValue,
      personGenderError,
      checkbox
    }
  }, components: {
    MDBInput, MDBCheckbox, MDBRadio
  }
}
</script>

<style scoped>

</style>