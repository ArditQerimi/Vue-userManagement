<template>
  <div
    style="
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      gap: 20px;
      padding: 10px 20px;
    "
  >
    <div style="display: flex; justify-content: space-between">
      <div>
        <el-input
          v-model="searchQuery"
          placeholder="Search Students"
        ></el-input>
      </div>
      <el-button type="primary" @click="openDialog">Add a new user</el-button>
    </div>
    <TableComponent
      :delete-item="openDeleteDialog"
      :edit-item="editStudent"
      :openDialog="openDialog"
      :items="filteredStudents"
    ></TableComponent>
  </div>

  <StudentDialog
    :close="handleClose"
    :dialog-visible="modalVisible"
    :row="row"
  ></StudentDialog>
  <DeleteDialogComponent
    :dialog-visible="deleteModalVisible"
    :close="closeDeleteDialog"
    :save="deleteStudent"
    content="Are you sure that you want to delete this item?"
    title="Delete Student Dialog"
  ></DeleteDialogComponent>
</template>

<script>
import TableComponent from "@/components/TableComponent.vue";
import DialogComponent from "@/components/DialogComponent.vue";
import { mapState } from "vuex";
import StudentDialog from "@/views/StudentsView/StudentDialog.vue";
import DeleteDialogComponent from "@/components/DeleteDialogComponent.vue";

export default {
  components: {
    DeleteDialogComponent,
    StudentDialog,
    TableComponent,
    DialogComponent,
  },
  data() {
    return {
      row: {},
      deleteItem: null,
      searchQuery: "",
    };
  },

  created() {
    this.$store.dispatch("students/fetchStudents").then(() => {
      this.students.forEach((student) => {
        student.actions = ["edit", "delete"];
      });
    });
  },
  methods: {
    editStudent(item) {
      this.openDialog();
      this.row = item;
    },
    deleteStudent() {
      this.$store.dispatch("students/deleteStudent", this.deleteItem);
    },
    openDeleteDialog(item) {
      this.deleteItem = item;
      this.$store.dispatch("students/setShowDeleteModal");
    },
    closeDeleteDialog() {
      this.$store.dispatch("students/setHideDeleteModal");
    },
    openDialog() {
      this.$store.dispatch("students/setShowModal");
    },
    handleClose() {
      this.$store.dispatch("students/setHideModal");
      this.row = {};
    },
  },

  computed: {
    ...mapState({
      students: (state) => state.students.students,
      user: (state) => state.auth.user,
      deleteModalVisible: (state) => state.students.deleteModalVisible,
      modalVisible: (state) => state.students.modalVisible,
    }),
    filteredStudents() {
      const query = this.searchQuery.toLowerCase().trim();

      return this.students
        .map((student) => {
          return {
            ...student,
            actions: ["edit", "delete"],
          };
        })
        .filter((student) => {
          return (
            student.index.toString().includes(query) ||
            student.name.toLowerCase().includes(query) ||
            student.DoB.includes(query) ||
            student.municipality.toLowerCase().includes(query)
          );
        });
    },
  },
};
</script>

<style scoped></style>
