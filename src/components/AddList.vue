<template>
  <div class="add-list">
    <button class="add-list__btn btn" @click="formActive=!formActive" v-if="!formActive">
      <i class="material-icons">add</i>Добавить ещё один список
    </button>
    <TaskForm
      class="add-list__form"
      @closed="formActive = !formActive"
      v-if="formActive"
      @added="addTask($event)"
      type="list"
    ></TaskForm>
  </div>
</template>

<script>
import TaskForm from "./TaskForm";
export default {
  components: { TaskForm },
  data: () => ({
    formActive: false
  }),
  methods: {
    addTask(text) {
      this.$store.dispatch("tasks/createList", text);
      this.formActive = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.add-list {
  width: 272px;
  min-width: 272px;
  max-width: 272px;
  background: #dfe3e6;
  border-radius: 3px;
  padding: 0 12px;
  &__form {
    margin-top: 13px;
  }
  &__btn {
    background-color: transparent;
    i {
      color: #808080;
      margin-left: -6px;
      margin-right: 4px;
    }
  }
}
</style>