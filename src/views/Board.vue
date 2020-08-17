<template>
  <div class="board">
    <div class="container">
      <TaskList v-for="(item, i) in tasks" :data="item" :key="`tasklist${i}`"></TaskList>
      <AddList></AddList>
    </div>
  </div>
</template>

<script>
import TaskList from "@/components/TaskList";
import AddList from "@/components/AddList";
import { mapState, mapGetters } from "vuex";
import fb from "firebase/app";
export default {
  components: {
    TaskList,
    AddList,
  },
  computed: {
    ...mapState({
      tasks: (state) => state.tasks.data,
    }),
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
  align-items: flex-start;
  display: flex;
  overflow-x: auto;
  height: 100%;
}
</style>