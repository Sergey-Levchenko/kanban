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
        <p>{{item.name}}</p>
      </li>
    </ul>
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
  mounted() {},
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
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      background-color: rgb(125, 255, 175);
    }
    // width: 90%;
    // margin-left: 5%;
  }
}
</style>