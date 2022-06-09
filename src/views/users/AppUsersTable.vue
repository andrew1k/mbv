<template>
  <MDBTable class="bg-white" hover responsive="md" captionTop sm align="middle">
    <thead class="bg-light">
    <tr>
      <th>Имя</th>
      <th>Дата рождения</th>
      <th>Телефон</th>
      <th>Позиция</th>
      <th>Действия</th>
    </tr>
    </thead>
    <tbody>
    <app-table-row
      v-for="user in appUsers"
      :key="user.localId"
      :user="user">
    </app-table-row>
    </tbody>
  </MDBTable>
</template>

<script>
import {
  MDBTable,
  MDBBtn,
  MDBBadge,
  MDBIcon,
} from 'mdb-vue-ui-kit'
import AppTableRow from '@/components/AppUsersTableRow'
import {onBeforeMount, ref} from 'vue'
import store from '@/store'

export default {
  setup() {
    const appUsers = ref([])
    onBeforeMount(async () => {
      await store.dispatch('usersData/loadData')
      const data = await store.getters['usersData/usersData']
      appUsers.value = Object.keys(data).map(key => {
        return {key: key, ...data[key]}
      })
    })
    return {
      appUsers,
    }
  },
  components: {
    MDBTable,
    MDBBtn,
    MDBBadge,
    MDBIcon,
    AppTableRow,
  }
  ,
}
</script>

<style scoped></style>