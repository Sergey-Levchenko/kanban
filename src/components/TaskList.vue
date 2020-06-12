<template>
  <div class="list">
    <div class="list__header">
      {{data.name}}
      <i class="material-icons delete" @click="deleteList">delete_outline</i>
    </div>

    <div class="list__main">
      <draggable
        class="list-group"
        v-model="data.list"
        group="tasks"
        @start="moving=true"
        @end="moving=false"
        @change="onChange"
      >
        <Task
          v-for="(item,i) in data.list"
          :data="item"
          :key="`task${i}`"
          :class="{moving}"
          @delete="deleteTask(i)"
          @save="editTask(i, $event)"
        ></Task>
      </draggable>
    </div>
    <TaskForm @closed="formActive = !formActive" v-if="formActive" @added="addTask"></TaskForm>
    <button class="btn" @click="formActive = !formActive" v-if="!formActive">
      <i class="material-icons">add</i>
      Добавить {{data.list.length?'ещё одну ':''}}карточку
    </button>
  </div>
</template>

<script>
import Task from "./Task";
import TaskForm from "./TaskForm";
import draggable from "vuedraggable";
export default {
  props: { data: { type: Object } },
  components: { Task, draggable, TaskForm },
  data: () => ({
    formActive: false,
    moving: false
  }),
  methods: {
    onChange() {
      this.$store.dispatch("tasks/saveAllTasks");
    },
    addTask(inputValue) {
      this.$store.dispatch(`tasks/addTaskById`, {
        id: this.data.id,
        inputValue
      });
      this.formActive = false;
    },
    deleteTask(index) {
      this.$store.dispatch(`tasks/deleteTaskById`, {
        id: this.data.id,
        index
      });
    },
    editTask(index, text) {
      this.$store.dispatch(`tasks/editSave`, {
        id: this.data.id,
        index,
        text
      });
    },
    deleteList() {
      this.$store.dispatch("tasks/deleteListById", this.data.id);
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  width: 272px;
  min-width: 272px;
  max-height: calc(100% - 40px);
  background: #dfe3e6;
  border-radius: 3px;
  padding: 0 12px;
  display: flex;
  flex-direction: column;
  margin-right: 12px;
  position: relative;
  &__header {
    font-weight: 900;
    font-size: 13px;
    line-height: 19px;
    padding: 9px 0 12px;
    &:hover .delete {
      opacity: 1;
    }
  }
  &__main {
    overflow-y: auto;
  }
  button {
    background: transparent;
    i {
      color: #808080;
      margin-left: -6px;
      margin-right: 4px;
    }
  }
  .delete {
    position: absolute;
    top: 8px;
    width: 18px;
    height: 18px;
    border-radius: 3px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(248, 248, 248);
    cursor: pointer;
    opacity: 0;
    transition: all 0.5s ease;
    background-color: tomato;
    right: 8px;
  }
}
</style>