<template>
  <div class="m-2 p-2 bg-white" style="border-radius: 8px">
    <div class="row">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
        <v-date-picker
            v-model="date"
            :columns="$screens({ default: 1, lg: 2 })"
            :rows="$screens({ default: 1, lg: 2 })"
            :is-expanded="$screens({ default: true, lg: false })"
            :min-date="new Date()"
            :attributes="attrs"
            @dayclick="dayClicked"
        ></v-date-picker>
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5">
        <div class="row px-3">
          <div class="col py-3">
            <h4>Создать задачу</h4>
            <p>Вы можете добавить задачу или изменить существующую</p>
          </div>
          <v-date-picker
              class="py-1"
              v-model="date"
              :min-date="new Date()"
              :attributes="scheduledTasks"
              @dayclick="dayClicked"
          >
            <template v-slot="{ inputValue, inputEvents, togglePopover }">
              <input
                  class="bg-white border px-2 py-1 rounded"
                  :value="inputValue"
                  @click="togglePopover"
              />
            </template>
          </v-date-picker>
          <form class="py-3" @submit.prevent="onSubmit">
            <MDBInput
                type="text"
                label="Название задачи"
                id="nameTaskMain"
                v-model="nameTask"
                wrapperClass="mb-4"
            />
            <MDBInput
                type="text"
                label="Ответственный"
                id="responsiblePerson"
                v-model="responsiblePerson"
                wrapperClass="mb-4"
            />
            <MDBTextarea
                type="text"
                label="Описание задачи"
                id="descriptionTaskMain"
                v-model="descriptionTask"
                wrapperClass="mb-4"
            />
            <MDBCol auto>
              <MDBBtn
                  color="btn bg-warning"
                  type="submit"
              >Сохранить
              </MDBBtn>
            </MDBCol>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="m-2 p-2 bg-white" style="border-radius: 8px">
    <div class="row px-3 py-2">
      <div class="col py-3">
        <h4>Задачи на {{ selectedDay.id }} </h4>
        <p>Вы можете изменить задачу или удалить</p>
      </div>
      <div class="row d-flex justify-content-around">
        <form class="py-3 col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
          <MDBInput
              type="text"
              label="Название задачи"
              id="nameTask"
              v-model="nameTask"
              wrapperClass="mb-4"
          />
          <MDBInput
              type="text"
              label="Ответственный"
              id="responsible"
              v-model="responsiblePerson"
              wrapperClass="mb-4"
          />
          <MDBTextarea
              type="text"
              label="Описание задачи"
              id="descriptionTask"
              v-model="descriptionTask"
              wrapperClass="mb-4"
          />
          <div class="d-flex flex-column">
            <MDBCol auto>
              <MDBBtn color="btn bg-warning">Сохранить изменения</MDBBtn>
            </MDBCol>
            <MDBCol auto class="py-3">
              <MDBBtn color="btn btn-danger">Удалить</MDBBtn>
            </MDBCol>
          </div>
        </form>
        <div class="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
          <h5 class="py-2">Сделать календарь</h5>
          <h5 class="py-2">Слава Чирков</h5>
          <h6 class="py-2 blockSize">Нужно сделать календарь с заметками событий. Нужно чтобы был выбор даты, название
            задачи,
            кто отвечает за задачу, описание задачи</h6>
          <MDBCol auto>
            <MDBBtn color="btn bg-warning">Изменить</MDBBtn>
          </MDBCol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  MDBBtn, 
  MDBCheckbox, 
  MDBCol, 
  MDBInput, 
  MDBTextarea,} from 'mdb-vue-ui-kit'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import moment from 'moment'


export default {
  components: {
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBTextarea,
    MDBCol,
  },
  setup() {
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
    }
  },
}
</script>

<style scoped>
.blockSize {
  height: 7em;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}
</style>