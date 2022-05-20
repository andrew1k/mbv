<template>
  <MDBTable class="align-middle mb-0 bg-white" responsive="md" hover>
    <thead class="bg-light" v-if="forTgList">
    <tr>
      <th>Имя</th>
      <th>Email</th>
      <th>Telegram</th>
      <th>Username</th>
      <th>
        <MDBBtn outline="dark" floating @click="$emit('loadUsers')">
          <MDBIcon icon="sync"></MDBIcon>
        </MDBBtn>
      </th>
    </tr>
    </thead>
    <thead class="bg-light" v-if="forAppList">
    <tr>
      <th>ФИО</th>
      <th>Возраст</th>
      <th>Email</th>
      <th>Телефон</th>
      <th>
        <MDBBtn outline="dark" floating @click="$emit('loadUsers')">
          <MDBIcon icon="sync"></MDBIcon>
        </MDBBtn>
      </th>
    </tr>
    </thead>
    <tbody v-if="forTgList">
    <tr v-for="user in users">
      <td>{{ user.firstName }}</td>
      <td>{{ user.email }}</td>
      <td><MDBBadge :badge="user.isAuthorized ? 'success' : 'danger'" pill class="d-inline">{{ user.isAuthorized }}</MDBBadge></td>
      <td>{{ user.username }}</td>
      <td>
        <MDBBtn outline="dark" @click="$emit('writeMessage')">Написать</MDBBtn>
      </td>
    </tr>
    </tbody>
    <tbody v-if="forAppList">
    <tr v-for="user in users">
      <td>{{ `${user.firstName} ${user.secondName}` }}</td>
      <td>{{ (user.birthDate) }}</td>
      <td>{{ user.email }}</td>
      <td>{{ user.phoneNumber }}</td>
      <td>
        <MDBBtn outline="dark" @click="$emit('writeMessage')">Написать</MDBBtn>
      </td>
    </tr>
    </tbody>
  </MDBTable>
</template>

<script>
import {
  MDBTable,
  MDBBtn,
  MDBBadge,
  MDBIcon,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from 'mdb-vue-ui-kit';
import {ref} from "vue";


export default {
  props: ['users', 'forTgList', 'forAppList'],
  emits: ['loadUsers', 'writeMessage'],
  setup() {
    const dropdown2 = ref(false);
    return {
      dropdown2
    }
  },
  components: {
    MDBTable,
    MDBBtn,
    MDBBadge,
    MDBIcon,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
  },
};
</script>

<style scoped>

</style>