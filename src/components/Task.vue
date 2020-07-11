<template>
  <div class="task" :contenteditable="editable">
    <p ref="editable">{{data}}</p>
    <i class="material-icons edit" @click="editHandler(true, $event)" v-if="!editable">edit</i>
    <i class="material-icons save" @click="editHandler(false, $event)" v-else>save</i>
    <i class="material-icons delete" @click="$emit('delete')">delete_outline</i>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data: () => ({
    editable: false
  }),
  methods: {
    editHandler(val, e) {
      if (!val && this.$refs.editable.innerText != this.data)
        this.$emit("save", tmp);
      this.editable = !this.editable;
    }
  }
};
</script>

<style lang="scss" scoped>
.task {
  font-size: 13px;
  line-height: 19px;
  background: #ffffff;
  box-shadow: 0px 1px 4px rgba(9, 45, 66, 0.25);
  border-radius: 3px;
  padding: 8px 4px 8px 12px;
  margin-bottom: 8px;
  position: relative;
  outline: none;
  &[contenteditable="true"] {
    box-shadow: 0px 2px 8px rgba(9, 45, 66, 0.404);
    font-weight: 700;
  }
  &:hover i {
    opacity: 1;
  }
  &.moving i {
    opacity: 0 !important;
  }
}
p {
  margin: 0;
}
i {
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
  &.delete {
    background-color: tomato;
    right: 8px;
  }
  &.edit,
  &.save {
    background-color: orange;
    right: 30px;
  }
}
</style>