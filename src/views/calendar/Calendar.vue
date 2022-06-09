<template>
  <div class="m-2 p-2 bg-white" style="border-radius: 8px">
    <div class="row">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 margin-calendar">
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
        <task-form v-if="!changeTask"></task-form>
        <change-task 
        @changeTaskCancel="callCancellation"
        @dateFromCalendar="dayClicked"
        :date="date"
        v-else>
        </change-task>
      </div>
    </div>
  </div>
  <div class="m-2 p-2 bg-white" style="border-radius: 8px">
    <div class="row px-3 py-2">
      <div class="col py-3">
        <h4>Задачи на {{ selectedDay.id }}</h4>
        <p>Вы можете изменить задачу или удалить</p>
        <h5 class="d-flex justify-content-center m-5">
          На этот день не запланировано задач
        </h5>
      </div>

      <div class="row d-flex justify-content-around">
        <task-for-day @changingTheTask="callCancellationForDay"></task-for-day>
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
  MDBTextarea,
} from "mdb-vue-ui-kit";
import { ref, watch} from "vue";
import moment from "moment";
import TaskForm from "@/views/calendar/TaskForm";
import ChangeTask from "@/views/calendar/ChangeTask";
import TaskForDay from './TaskForDay.vue';

export default {
  components: {
    ChangeTask,
    TaskForm,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBTextarea,
    MDBCol,
    TaskForDay,
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
      id: moment().format("YYYY/M/D"),
    });
   

    function dayClicked(day) {
      selectedDay.value = day;
      selectedDay.value.id = moment(selectedDay.value.id).format("YYYY/M/D");
      console.log(selectedDay)
    }

    
    

    const changeTask = ref(false);
    function callCancellation() {
      changeTask.value = false
    }
    function callCancellationForDay() {
      changeTask.value = true
    }



    function connectingDates(newDay) {
      selectedDay.value = newDay;
      selectedDay.value.id = moment(selectedDay.value.id).format("YYYY/M/D");
    }

    // Отправка данных на сервер
    // const {handleSubmit} = useForm()
    // const nameInCharge = ref('')
    // const store = useStore()
    // const {value: nameTask} = useField('nameTask', yup.string().required('Это поле должно быть обязательно'))
    // const {value: responsiblePerson} = useField('responsiblePerson', yup.string())
    // const {value: descriptionTask} = useField('descriptionTask', yup.string())
    // const onSubmit = handleSubmit(async values => {
    //   await store.dispatch('tasks/noteInCalendar', {...values, date: selectedDay.value.id})
    // })

    return {
      // nameTask,
      // nameInCharge,
      // descriptionTask,
      // responsiblePerson,
      date,
      // onSubmit,
      attrs,
      scheduledTasks,
      selectedDay,
      dayClicked,
      changeTask,
      callCancellation,
      callCancellationForDay,
      connectingDates, 
      dayClicked
    };
  },
};
</script>

<style scoped>
.blockSize {
  height: 7em;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}

@media (min-width: 1200px) and (max-width: 1400px) {
  .margin-calendar {
    margin-right: 10rem;
  }
}

@media (min-width: 1400px) and (max-width: 1700px) {
  .margin-calendar {
    margin-right: 4rem;
  }
}
</style>