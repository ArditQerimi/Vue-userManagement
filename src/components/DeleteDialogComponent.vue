<template>
  <el-dialog
    v-model="isVisible"
    :title="title"
    width="30%"
    :before-close="handleClose"
    align-center
    class="delete-dialog"
  >
    <div style="font-size: 18px">{{ content }}</div>
    <template #footer>
      <div style="display: flex; justify-content: flex-end; gap: 10px">
        <el-button type="text" @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="save"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { ref, watchEffect } from "vue";

export default {
  name: "DeleteDialogComponent",
  props: {
    close: {
      type: Function,
      required: true,
    },
    save: {
      type: Function,
      required: true,
    },
    dialogVisible: {
      type: Boolean,
      required: true,
    },
    row: {
      type: Object,
      required: false,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },

  methods: {
    handleClose() {
      this.close();
    },
  },
  setup(props) {
    const isVisible = ref(props.dialogVisible);

    const updateDialogVisible = (newValue) => {
      isVisible.value = newValue;
    };

    watchEffect(() => {
      isVisible.value = props.dialogVisible;
    });

    return {
      isVisible,
      updateDialogVisible,
    };
  },
  watch: {},
};
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.delete-dialog .el-dialog-title {
  font-weight: bold;
}
</style>
