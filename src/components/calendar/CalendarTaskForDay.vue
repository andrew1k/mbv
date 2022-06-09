<template>
  <div class="col-12 col-sm-6 col-md-5 col-lg-3 col-xl-3">
    <h5 class="py-2">Сделать календарь</h5>
    <h5 class="py-2">Слава Чирков</h5>
    <h6 class="py-2 blockSize">
      Нужно сделать календарь с заметками событий. Нужно чтобы был выбор даты,
      название задачи, кто отвечает за задачу, описание задачи
    </h6>
    <MDBCol auto>
      <MDBBtn color="btn bg-warning" @click="changeTaskForDay"
        >Изменить
      </MDBBtn>
    </MDBCol>
  </div>
</template>

<script>
import {MDBBtn, MDBCheckbox, MDBCol, MDBInput, MDBRow, MDBTextarea} from 'mdb-vue-ui-kit'
import {ref, computed} from 'vue'
import {useStore} from 'vuex'




export default {
    name: "TaskForDay",
    components: {
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBTextarea,
    MDBCol,
    MDBRow,
  },
   setup(props, {emit}) {
    function changeTaskForDay() {
      emit('changingTheTask')
    }
  
    return {
      changeTaskForDay,
    }
  },
};
</script>

<style>
</style>