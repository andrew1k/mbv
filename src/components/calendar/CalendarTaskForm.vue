<template>
  <div class="row px-3">
    <div class="d-flex flex-column">
      <div class="col py-3">
        <h4>Создать задачу</h4>
        <p>Вы можете добавить задачу или изменить существующую</p>
      </div>
      <MDBCol class="d-flex justify-content-end align-items-end" v-if="buttonCreate">
        <MDBBtn
            @click="formTask = true; buttonCreate = false"
            color="btn bg-warning"
            type="submit"
        ><i class="fas fa-plus padding-right"></i>Создать
        </MDBBtn>
      </MDBCol>
    </div>
    <div v-if="formTask">
      <form class="pb-3" @submit.prevent="onSubmit">
        <MDBRow>
          <MDBCol>
            <v-date-picker
                v-model="date"
                :min-date="new Date()"
                :attributes="scheduledTasks"
                @dayclick="dayClicked"
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
          <MDBBtn
              class="mx-3"
              color="btn bg-warning"
              type="submit"
          >Сохранить
          </MDBBtn>
          <MDBBtn
              @click="formTask = false; buttonCreate = true"
              color="btn btn-info"
              type="submit"
          >Отмена
          </MDBBtn>
        </MDBCol>
      </form>
    </div>
  </div>
</template>

<script>
import {MDBBtn, MDBCheckbox, MDBCol, MDBInput, MDBRow, MDBTextarea} from 'mdb-vue-ui-kit'
import {ref} from 'vue'
import {useStore} from 'vuex'
import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'
import moment from 'moment'

export default {
  name: "TaskForm",
  components: {
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBTextarea,
    MDBCol,
    MDBRow,
  },
  setup(props, {emit}) {
    // Работа с календарями
    const date = new Date()
    const attrs = ref([
      {
        key: 'today',
        highlight: "red",
        dates: new Date(),
      },
      {
        dot: true,
        dates: [
          new Date(2022, 4, 10),
          new Date(2022, 4, 30),
          new Date(2022, 5, 7),
        ],
      }
    ])
    const scheduledTasks = ref([
      {
        dot: true,
        dates: [
          new Date(2022, 4, 10),
          new Date(2022, 4, 30),
          new Date(2022, 5, 7),
        ],
      }
    ])
    const selectedDay = ref({
      id: moment().format('YYYY/M/D')
    })

    function dayClicked(day) {
      selectedDay.value = day
      selectedDay.value.id = moment(selectedDay.value.id).format('YYYY/M/D')
    }

    // Отправка данных на сервер
    const {handleSubmit} = useForm()
    const nameInCharge = ref('')
    const store = useStore()
    const {value: nameTask} = useField('nameTask', yup.string().required('Это поле должно быть обязательно'))
    const {value: responsiblePerson} = useField('responsiblePerson', yup.string())
    const {value: descriptionTask} = useField('descriptionTask', yup.string())
    const onSubmit = handleSubmit(async values => {
      await store.dispatch('tasks/noteInCalendar', {...values, date: selectedDay.value.id})
    })

    const formTask = ref(false)
    const buttonCreate = ref(true)
    // function formTask() {
    //   task.value = true
    // }

    return {
      nameTask,
      nameInCharge,
      descriptionTask,
      responsiblePerson,
      date,
      onSubmit,
      attrs,
      scheduledTasks,
      selectedDay,
      dayClicked,
      formTask,
      buttonCreate,
      // task,
      // formTask,
    }
  },
}

</script>

<style scoped>
.padding-right {
  padding-right: 0.5rem;
}
</style>