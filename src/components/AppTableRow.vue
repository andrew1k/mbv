<template>
  <tr>
    <td>
      <p class="fw-bold mb-1">{{ `${user.firstName} ${user.secondName}` }}</p>
      <a class="text-muted mb-0" :href="`mailto:${ user.email }`">{{ user.email }}</a>
    </td>
    <td>{{ user.birthDate }}</td>
    <td><a class="text-black" :href="`tel:${ user.phoneNumber }`">{{ user.phoneNumber }}</a></td>
    <td>
      <p class="fw-bold mb-1">{{ user.authLevel }}</p>
      <p class="text-muted mb-0">{{ user.servTeam }}</p>
    </td>
    <td>
      <MDBBtn
          color="link"
          size="lg"
          @click="collapse1 = !collapse1"
          aria-controls="collapsibleContent1"
          :aria-expanded="collapse1">
        <i class="fas fa-ellipsis-h text-black"></i>
      </MDBBtn>
      <MDBBtn
          v-if="user.telegramIsAuthorized"
          color="link"
          size="lg"
          @click="collapse2 = !collapse2"
          aria-controls="collapsibleContent1"
          :aria-expanded="collapse2">
        <i class="fab fa-telegram-plane text-black"></i>
      </MDBBtn>
    </td>
  </tr>
  <tr v-if="collapse1">
    <td colspan="5">
      <MDBCollapse
          id="collapsibleContent1"
          v-model="collapse1">
        <form class="row" @submit="saveData">
          <div class="col">
            <select class="form-select form-select-sm" v-model="authLevel">
              <option value="1">Админ</option>
              <option value="2">Служитель</option>
              <option value="3">Ведущий</option>
              <option value="4">Молодежный ведущий</option>
              <option value="5">Гость</option>
            </select>
          </div>
          <div class="col">
            <select class="form-select form-select-sm col" v-model="servTeam">
              <option value="1">Моё Поколение</option>
              <option value="2">Группа Прославления</option>
              <option value="3">Стойка Информации</option>
              <option value="4">Группа порядка</option>
              <option value="5">Служение в кафе</option>
            </select>
          </div>
          <div class="col">
            <MDBBtn outline="dark" type="submit" :disabled="isSubmitting" size="sm">Сохранить</MDBBtn>
          </div>
        </form>
      </MDBCollapse>
    </td>
  </tr>
  <tr v-if="collapse2">
    <td colspan="5">
      <MDBCollapse
          id="collapsibleContent1"
          v-model="collapse2">
        <form class="row align-content-center align-items-center" @submit="sendOneMessageForTelegram">
          <div class="col-lg-10 col-md-9">
            <MDBTextarea label="Сообщение" v-model="messageForTelegram" rows="2"/>
            <small v-if="eMessageForTelegram">{{ eMessageForTelegram }}</small>
          </div>
          <div class="col-lg-2 col-md-3 my-2">
            <MDBBtn outline="dark" type="submit" :disabled="isSubmitting">Отправить</MDBBtn>
          </div>
        </form>
      </MDBCollapse>
    </td>
  </tr>
</template>

<script>
import {
  MDBBtn,
  MDBCollapse,
  MDBTextarea,
  MDBInput,
  MDBIcon,
} from 'mdb-vue-ui-kit'
import {ref} from 'vue'
import {useForm, useField} from 'vee-validate'
import * as yup from 'yup'
import store from '@/store'
import axios from 'axios'

export default {
  props: ['user'],
  components: {
    MDBBtn,
    MDBCollapse,
    MDBTextarea,
    MDBInput,
    MDBIcon,
  },
  setup(props) {
    const {handleSubmit, isSubmitting} = useForm()
    const collapse1 = ref(false)
    const collapse2 = ref(false)
    const {value: authLevel} = useField('authLevel', yup.string(), {initialValue: props.user.authLevel})
    const {value: servTeam} = useField('servTeam', yup.string(), {initialValue: props.user.servTeam})
    const {value: messageForTelegram, errorMessage: eMessageForTelegram} = useField('messageForTelegram',
      yup.string())
    const saveData = handleSubmit(async (values) => {
      const toStore = {
        localId: props.user.key,
        authLevel: values.authLevel,
        servTeam: values.servTeam,
      }
      await store.dispatch('usersData/saveData', toStore)
    })
    const sendOneMessageForTelegram = handleSubmit(async values => {
      await axios.post(`https://api.telegram.org/bot${process.env.VUE_APP_BOT_TOKEN}/sendMessage?chat_id=${props.user.telegramId}&text=${values.messageForTelegram}`)
    })
    return {
      collapse1, collapse2,
      authLevel, servTeam,
      isSubmitting, saveData,
      messageForTelegram, eMessageForTelegram,
      sendOneMessageForTelegram,
    }
  },
}
</script>

<style scoped></style>