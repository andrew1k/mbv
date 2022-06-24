<template>

  <div class="row px-3">
    <div class="d-flex flex-column">
      <div class="col py-3">
        <h4>Создать задачу</h4>
        <p>Вы можете добавить задачу или изменить существующую</p>
      </div>
    </div>
    <div>
      <form class="pb-3" @submit.prevent="onSubmit">
        <MDBRow>
          <MDBCol>
            <v-date-picker
              v-model="date"
              :min-date="new Date()"
              :attributes="scheduledTasks"
              @dayclick="NewDayClicked"
            >
              <template v-slot="{ inputValue, togglePopover }">
                <input
                  class="bg-white border px-2 py-1 rounded col-12"
                  :value="inputValue"
                  @click="togglePopover"
                />
              </template>
            </v-date-picker>
          </MDBCol>
          <MDBCol>
            <MDBInput
              type="text"
              label="Название задачи"
              id="nameTaskMain"
              v-model="nameTask"
              wrapperClass="mb-4"
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <MDBInput
              type="text"
              label="Ответственный"
              id="responsiblePerson"
              v-model="responsiblePerson"
              wrapperClass="mb-4"
            />
          </MDBCol>
          <MDBCol>
            <MDBTextarea
              type="text"
              label="Описание задачи"
              id="descriptionTaskMain"
              v-model="descriptionTask"
              wrapperClass="mb-4"
            />
          </MDBCol>
        </MDBRow>
        <MDBCol auto class="d-flex justify-content-end">
          <MDBBtn color="btn bg-warning" type="submit"> Сохранить </MDBBtn>
          <MDBBtn
            @click="changeCancel"
            class="mx-3"
            color="btn btn-info"
            type="submit"
            >Отмена
          </MDBBtn>
          <MDBBtn color="btn btn-danger" type="submit"> Удалить </MDBBtn>
        </MDBCol>
      </form>
    </div>
  </div>
</template>

<script>
import {
  MDBBtn,
  MDBCheckbox,
  MDBCol,
  MDBInput,
  MDBRow,
  MDBTextarea,
} from "mdb-vue-ui-kit";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import moment from "moment";

export default {
  props: {
    date: Object,
    // dayClicked: Function,
    selectedDay: Object
  },
  name: "ChangeTask",
  components: {
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBTextarea,
    MDBCol,
    MDBRow,
  },
  setup(props, { emit }) {
    // Отправка данных на сервер
    const { handleSubmit } = useForm();
    const nameInCharge = ref("");
    const store = useStore();
    const { value: nameTask } = useField(
      "nameTask",
      yup.string().required("Это поле должно быть обязательно")
    );
    const { value: responsiblePerson } = useField(
      "responsiblePerson",
      yup.string()
    );
    const { value: descriptionTask } = useField(
      "descriptionTask",
      yup.string()
    );
    const onSubmit = handleSubmit(async (values) => {
      await store.dispatch("tasks/noteInCalendar", {
        ...values,
        date: selectedDay.value.id,
      });
    });
    function changeCancel() {
      emit("changeTaskCancel");
    }
     const NewSelectedDay = ref({
      id: moment().format("YYYY/M/D"),
    });



    function NewDayClicked(day) {
      emit("dateFromCalendar", day);
      console.log(day)
    }
    // function connectionOfCalendaries() {
    //   props.selectedDay = NewSelectedDay
    //   emit("dateFromCalendar", NewSelectedDay)
    // }
    return {
      nameTask,
      nameInCharge,
      descriptionTask,
      responsiblePerson,
      // date,
      onSubmit,

      // selectedDay,
      NewDayClicked,
      changeCancel,
      // connectionOfCalendaries,
      NewSelectedDay,
      // NewdayClicked
    };
  },
};
</script>

<style scoped>

</style>