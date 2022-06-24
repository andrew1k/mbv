<template>

  <div class="row px-3">
    <div class="d-flex flex-column">
      <div class="col py-3">
        <h4>Создать задачу</h4>
        <p>Вы можете добавить задачу или изменить существующую</p>
      </div>
      <MDBCol v-if="(buttonCreate && !changeTask)">
<!--        class="d-flex justify-content-end align-items-end"-->
        <MDBBtn
            @click="formTask = true; buttonCreate = false;"
            color="btn bg-warning"
            type="submit"
        ><i class="fas fa-plus padding-right"></i>Создать
        </MDBBtn>
      </MDBCol>
    </div>
    <div v-if="(formTask || changeTask)">
      <form class="pb-3" @submit.prevent="onSubmit">
        <MDBRow>
          <MDBCol>
            <v-date-picker
                v-model="date"
                :min-date="new Date()"
                :attributes="scheduledTasks"
                @dayclick="dayClicked"
            >
              <template v-slot="{ inputValue, togglePopover, inputEvents }">
                <input
                    class="bg-white border px-2 py-1 rounded col-12"
                    :value="inputValue"
                    @click="togglePopover"
                    v-on="inputEvents"
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
        <MDBCol auto>
          <MDBBtn
              color="btn bg-warning"
              type="submit"
          >Сохранить
          </MDBBtn>
          <MDBBtn
              class="mx-3"
              @click="cancel"
              color="btn btn-info"
              type="submit"
          >Отмена
          </MDBBtn>
          <MDBBtn
              color="btn btn-danger"
              type="submit"
              v-if="changeTask"
          >Удалить </MDBBtn>
        </MDBCol>
      </form>
    </div>
  </div>
</template>

<script>
import {MDBBtn, MDBCheckbox, MDBCol, MDBInput, MDBRow, MDBTextarea} from 'mdb-vue-ui-kit'
import {ref, computed, watch, onMounted} from 'vue'
import {useStore} from 'vuex'
import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'
import moment from 'moment'

export default {
  props: {
    changeTask: Boolean,
    calendarDate: Object,
  },
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
    /**
     * date = ref(new Date()), делаем так, т.к. через props передать не получилось
     * TODO: РЕФАКТОРИНГ
     */
    let date = ref(new Date())
    /**
     * присваем значение полученного из родительского к date календаря
     * получилось сделать только при использовании computed, т.к. props не реактивен
     */
    const newDate = computed(() => props.calendarDate )
    watch(newDate, (newValue, oldValue) => {
      date.value = props.calendarDate
    })
    /**
     * передача date в родительский компонент
     * Сравниваем date, чтобы не было рекурсии.(Чтобы передавалось один раз)
     */
    watch(date, (newValue, oldValue) => {
      if (moment(date.value).format('d') !== moment(newDate.value).format('d')) {
        emit("update", date);
      }
    })

    // const date = ref(props.calendarDate)
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
      // console.log(selectedDay)
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
    async function fetchData() {
       const x = await store.dispatch('tasks/getTasks')
    }
    onMounted(async () => {
      const x = await fetchData()
      console.log(x)
    })

    const formTask = ref(false)
    const buttonCreate = ref(true)
    const isCreating = ref(props.changeTask)

    function cancel () {
      formTask.value = false;
      isCreating.value = false;
      buttonCreate.value = true;
      emit("changeButtonCancel");
    }

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
      cancel,
      isCreating,
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