<template>
  <el-container fluid class="spacing-playground pa-6 justify-center">
    <DialogComponent
      :dialog-visible="dialogVisible"
      :ok="close"
      :dialogTitle="'Student Details'"
      :close="null"
    >
      <el-row>
        <el-col :span="24">
          <el-card class="student-card">
            <p><strong>Index:</strong> {{ form.index }}</p>
            <p><strong>Name:</strong> {{ form.name }}</p>
            <p><strong>Date of Birth:</strong> {{ form.DoB }}</p>
            <p><strong>Municipality:</strong> {{ form.municipality }}</p>
          </el-card>
        </el-col>
      </el-row>
    </DialogComponent>
  </el-container>
</template>

<script>
import DialogComponent from "@/components/DialogComponent.vue";

export default {
  components: {
    DialogComponent,
  },
  props: {
    close: {
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
  },
  data() {
    return {
      form: {
        index: "",
        name: "",
        DoB: "",
        municipality: "",
      },
    };
  },
  watch: {
    row(value) {
      this.form.index = value?.index;
      this.form.name = value?.name;
      this.form.DoB = value?.DoB;
      this.form.municipality = value?.municipality;
    },
  },
};
</script>

<style scoped>
.student-card {
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
