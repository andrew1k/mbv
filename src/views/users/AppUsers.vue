<template>
  <div class="m-1 p-2 bg-light" style="border-radius: 8px;">
    <MDBTable class="mb-0 bg-white" hover responsive="md" captionTop sm align="middle">
      <thead class="bg-light">
      <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Телефон</th>
        <th>Позиция</th>
        <th>
          <MDBBtn size="sm" outline="dark" floating @click="loadUsers">
            <MDBIcon icon="sync"/>
          </MDBBtn>
        </th>
      </tr>
      </thead>
      <tbody>
      <app-table-row :user="user" v-for="user in appUsers"></app-table-row>
      </tbody>
    </MDBTable>
  </div>
</template>

<script>
import {
  MDBTable,
  MDBBtn,
  MDBBadge,
  MDBIcon
} from 'mdb-vue-ui-kit'
import AppTableRow from '@/components/AppTableRow'
import axios from 'axios'
import {ref} from "vue";

export default {
  setup() {
    const appUsers = ref([])
    const loadUsers = async () => {
      const {data} = await axios.get(`${process.env.VUE_APP_DB_URL}/appUsers.json?auth=${localStorage.getItem('token')}`)
      appUsers.value = Object.keys(data).map(key => {
        return {key: key ,...data[key]}
      })
    }
    return {
      loadUsers,
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

<style scoped>

</style>