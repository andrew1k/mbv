<template>
  <div class="m-1 p-2 bg-light" style="border-radius: 8px">
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xl-6">

        <select class="form-select my-1">
          <option selected>Всем</option>
          <option >Служителям</option>
          <option >Молодежным ведущим МГ</option>
          <option >Ведущим МГ</option>
          <option >Незарегистрированным</option>
        </select>
        <MDBTextarea rows="2"/>
      </div>
      <div class="col">
      </div>
    </div>
    <div class="row my-1">
      <div class="col">
        <MDBBtn outline="dark">Отправить</MDBBtn>
      </div>
    </div>
  </div>
  <div class="m-1 p-2 bg-light align-items-lg-center align-content-lg-center text-lg-center justify-content-center" style="border-radius: 8px">
    <MDBTable class="align-middle mb-0 bg-white" hover responsive="md">
      <thead class="bg-light">
      <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Telegram</th>
        <th>Позиция</th>
        <th>
          <MDBBtn outline="dark" rounded size="sm" @click="loadUsers">
            Обновить
          </MDBBtn>
        </th>
      </tr>
      </thead>
      <tbody>
      <app-table-row for-telegram-users="true"></app-table-row>
      <app-table-row for-telegram-users="true"></app-table-row>
      <app-table-row for-telegram-users="true"></app-table-row>
      <app-table-row for-telegram-users="true"></app-table-row>
      </tbody>
    </MDBTable>
  </div>
</template>

<script>
import {MDBTable, MDBIcon, MDBBtn, MDBTextarea, MDBCheckbox} from 'mdb-vue-ui-kit'
import AppTableRow from "@/components/AppUsersTableRow";
// import axios from "axios";

export default {
  setup() {

    return {}
  },
  components: {
    AppTableRow,
    MDBBtn,
    MDBIcon,
    MDBTable,
    MDBTextarea,
    MDBCheckbox
  }
}
</script>

<style scoped>

</style>