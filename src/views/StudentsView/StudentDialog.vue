<template>
  <el-container fluid class="spacing-playground pa-6 justify-center">
    <DialogComponent
      :dialog-visible="dialogVisible"
      :row="row"
      :close="close"
      :save="() => validateAndSave(form.id ? 'editStudent' : 'addStudent')"
      :dialogTitle="form.id ? 'Edit Student' : 'Add Student'"
    >
      <el-form
        ref="ruleFormRef"
        :model="form"
        :rules="rules"
        label-position="top"
        class="student-dialog"
        :style="{ width: '90% !important', margin: 'auto' }"
      >
        <el-form-item label="Index" prop="index">
          <el-input v-model="form.index" placeholder="Index"></el-input>
        </el-form-item>
        <el-form-item label="Name" prop="name">
          <el-input v-model="form.name" placeholder="Name"></el-input>
        </el-form-item>
        <el-form-item label="Date of Birth" prop="DoB">
          <el-input v-model="form.DoB" placeholder="DoB"></el-input>
        </el-form-item>
        <el-form-item label="Municipality" prop="municipality">
          <el-input
            v-model="form.municipality"
            placeholder="Municipality"
          ></el-input>
        </el-form-item>
      </el-form>
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
        id: null,
        index: null,
        name: "",
        DoB: null,
        municipality: "",
      },
      submitting: false,
      submitError: null,
      submitSuccess: false,
      isEdit: false,
    };
  },
  computed: {
    rules() {
      return {
        index: [
          { required: true, message: "Index is required", trigger: "blur" },
        ],
        name: [
          { required: true, message: "Name is required", trigger: "blur" },
          {
            min: 2,
            max: 50,
            message: "Name must be between 2 and 50 characters",
            trigger: "blur",
          },
        ],
        DoB: [
          {
            required: true,
            message: "Date of Birth is required",
            trigger: "blur",
          },
          {
            pattern: /^(0[1-9]|[1-2]\d|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/,
            message: "Date format must be DD-MM-YYYY",
            trigger: "blur",
          },
        ],
        municipality: [
          {
            required: true,
            message: "Municipality is required",
            trigger: "blur",
          },
          {
            min: 2,
            max: 30,
            message: "Municipality must be between 2 and 30 characters",
            trigger: "blur",
          },
        ],
      };
    },
  },
  methods: {
    async validateAndSave(actionType) {
      this.$refs.ruleFormRef.validate(async (valid) => {
        if (valid) {
          await this.saveStudent(actionType);
        }
      });
    },

    async saveStudent(actionType) {
      let newForm = { ...this.form };

      if (actionType === "addStudent") {
        newForm.id = Math.random() * 1000;
      }

      this.$store.dispatch(`students/${actionType}`, newForm);
    },
  },

  watch: {
    row(value) {
      this.form.id = value?.id;
      this.form.name = value?.name;
      this.form.index = value?.index;
      this.form.DoB = value?.DoB;
      this.form.municipality = value?.municipality;
      this.isEdit = !!value;
    },
  },
};
</script>

<style scoped>
.student-dialog,
.el-input__wrapper {
  width: 100% !important;
}
</style>
