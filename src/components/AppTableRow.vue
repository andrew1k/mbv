<template>
  <tr v-for="user in AppUsers">
    <td>
      <p class="fw-bold mb-1">{{ `${user.firstName} ${user.secondName}` }}</p>
      <p class="text-muted mb-0">{{ user.email }}</p>
    </td>
    <td>32</td>
    <td>+7</td>
    <td>
      <p class="fw-bold mb-1">Служитель</p>
      <p class="text-muted mb-0">Команда Ашеров</p>
    </td>
    <td v-if="forAppUsers">
      <MDBBtn
          tag="a"
          color="link"
          size="sm"
          rounded
          outline="dark"
          @click="collapse1 = !collapse1"
          aria-controls="collapsibleContent1"
          :aria-expanded="collapse1">
        Изменить
      </MDBBtn>
    </td>
    <td v-if="forTelegramUsers">
      <MDBBtn
          tag="a"
          color="link"
          size="sm"
          rounded
          outline="dark"
          @click="collapse1 = !collapse1"
          aria-controls="collapsibleContent1"
          :aria-expanded="collapse1">
        Написать
      </MDBBtn>
    </td>
  </tr>
  <tr v-if="collapse1 && forAppUsers">
    <td colspan="5">
      <MDBCollapse
          id="collapsibleContent1"
          v-model="collapse1">
        <form class="row" @submit.prevent>
          <div class="col">
            <select class="form-select" v-model="authLevel">
              <option value="1">Админ</option>
              <option value="2">Служитель</option>
              <option value="3">Ведущий</option>
              <option value="4">Молодежный ведущий</option>
              <option value="5">Гость</option>
            </select>
          </div>
          <div class="col">
            <select class="form-select col" v-model="servTeam">
              <option value="1">Моё Поколение</option>
              <option value="2">Группа Прославления</option>
              <option value="3">Стойка Информации</option>
              <option value="4">Группа порядка</option>
              <option value="5">Служение в кафе</option>
            </select>
          </div>
          <div class="col">
            <MDBBtn outline="dark">Сохранить</MDBBtn>
          </div>
        </form>
      </MDBCollapse>
    </td>
  </tr>
  <tr v-if="collapse1 && forTelegramUsers">
    <td colspan="5">
      <MDBCollapse
          id="collapsibleContent1"
          v-model="collapse1">
        <div class="row align-content-center align-items-center ">
          <div class="col-lg-10 col-md-9">
            <MDBTextarea label="Сообщение" v-model="oneMessageForTelegram" rows="2"/>
          </div>
          <div class="col-lg-2 col-md-3 my-2">
            <MDBBtn outline="dark" @click="$emit('sendOneMessageForTelegram')">Отправить</MDBBtn>
          </div>
        </div>
      </MDBCollapse>
    </td>
  </tr>
</template>

<script>
import {
  MDBBtn,
  MDBCollapse,
  MDBTextarea,
  MDBInput
} from 'mdb-vue-ui-kit'
import {ref} from 'vue'

export default {
  props: ['appUsers', 'ForAppUsers', 'ForTelegramUsers'],
  components: {
    MDBBtn,
    MDBCollapse,
    MDBTextarea,
    MDBInput,
  },
  setup() {
    const collapse1 = ref(false)
    const authLevel = ref(1)
    const servTeam = ref(1)
    return {
      collapse1,
      authLevel,
      servTeam,
    }
  },
}
</script>

<style scoped>

</style>
