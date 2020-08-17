<template>
  <div class="home">
    <h1>Ваши Доски</h1>
    <ul class="boards">
      <li
        class="boards__item"
        v-for="(item, i) in boards"
        :key="`board${i}`"
        @click="$router.push(`/board/${item.id}`)"
      >
        <p>{{item.id}}</p>
      </li>
    </ul>
    <button class="add-board" @click="addHandler">Добавить доску</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      boards: (state) => state.tasks.boards,
    }),
  },
  methods: {
    addHandler() {
      this.$store.dispatch("tasks/addBoard");
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  background: rgb(223, 220, 255);
  background: linear-gradient(
    9deg,
    rgba(223, 220, 255, 1) 0%,
    rgba(246, 246, 246, 1) 50%,
    rgba(249, 230, 255, 1) 100%
  );
  display: flex;
  flex-direction: column;
  padding: 5%;
}
h1 {
  text-align: center;
  margin: 0;
  color: #6b808c;
}
.boards {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  &__item {
    background-color: rgba(125, 255, 175, 0.7);
    padding: 10px 30px;
    margin-top: 10px;
    border-radius: 5px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      background-color: rgb(125, 255, 175);
    }
    // width: 90%;
    // margin-left: 5%;
  }
}
.add-board {
  background-color: rgba(112, 191, 255, 0.7);
  padding: 10px 30px;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 13px;
  font-weight: 700;
  color: #ffffff;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: rgb(125, 255, 175);
  }
  &:focus {
    outline: none;
  }
}
</style>