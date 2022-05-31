<template>
  <div class="m-1 p-2 bg-light" style="border-radius: 8px">
    <MDBTable class="align-middle mb-0 bg-white" striped hover responsive="md">
      <thead class="bg-light">
      <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Телефон</th>
        <th>Позиция</th>
        <th>
          <MDBBtn outline="dark" floating @click="loadUsers">
            <MDBIcon icon="sync" />
          </MDBBtn>
        </th>
      </tr>
      </thead>
      <tbody>
      <app-table-row for-app-users="true" app-users="AppUsers"></app-table-row>
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
} from 'mdb-vue-ui-kit';
import AppTableRow from "@/components/AppTableRow";
import axios from "axios";

export default {
  setup(props, context) {
    const appUsers = []
    const loadUsers = async () => {
      // const {data} = await axios.get(`${process.env.VUE_APP_DB_URL}/appUsers.json`)
      console.log(data)
      props.appUsers = Object.keys(data).map(key => {
        return {key: key ,...data[key]}
      })
    }
    console.log(appUsers)
    return {
      loadUsers,
      appUsers,
    }
  },
  components: {
    MDBTable,
    MDBBtn,
    MDBBadge,
    AppTableRow,
    MDBIcon
  },
};
</script>

<style scoped>

</style>