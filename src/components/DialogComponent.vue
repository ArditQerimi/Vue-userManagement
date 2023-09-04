<template>
  <el-dialog
    v-model="isVisible"
    :title="dialogTitle"
    width="30%"
    :before-close="close ? close : ok"
    align-center
  >
    <slot></slot>
    <template #footer>
      <div style="display: flex; justify-content: flex-end; gap: 10px">
        <el-button type="text" v-if="close" @click="close">Cancel</el-button>
        <el-button type="primary" v-if="save" @click="save">Save</el-button>
        <el-button type="primary" v-if="ok" @click="ok">Ok</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { ref, watchEffect } from "vue";
export default {
  name: "DialogComponent",
  props: {
    close: {
      type: Function,
      required: false,
    },
    save: {
      type: Function,
      required: false,
    },
    ok: {
      type: Function,
      required: false,
    },
    dialogVisible: {
      type: Boolean,
      required: true,
    },
    row: {
      type: Object,
      required: false,
    },
    dialogTitle: {
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
      console.log(newValue);
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
};
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
