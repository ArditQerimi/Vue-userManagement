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
    <div style="display: flex; justify-content: start">
      <div>
        <el-input
          v-model="searchQuery"
          placeholder="Search Students"
        ></el-input>
      </div>
    </div>
    <TableComponent
      :delete-item="openDeleteDialog"
      :edit-item="editStudent"
      :items="filteredStudents"
    >
    </TableComponent>
  </div>
  <ArchiveDialog
    :close="handleClose"
    :dialog-visible="modalVisible"
    :row="row"
  ></ArchiveDialog>
  <DeleteDialogComponent
    :dialog-visible="deleteModalVisible"
    :close="closeDeleteDialog"
    :save="deleteStudent"
    content="Are you sure that you want to restore this item?"
    title="Restore Student Dialog"
  ></DeleteDialogComponent>
</template>

<script>
import TableComponent from "@/components/TableComponent.vue";
import DialogComponent from "@/components/DialogComponent.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import StudentDialog from "@/views/StudentsView/StudentDialog.vue";
import DeleteDialogComponent from "@/components/DeleteDialogComponent.vue";
import ArchiveDialog from "@/views/ArchiveView/ArchiveDialog.vue";

export default {
  components: {
    ArchiveDialog,
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
    this.$store.dispatch("students/fetchArchivedStudents").then(() => {
      this.archivedStudents.forEach((student) => {
        student.actions = ["view", "restore"];
      });
    });
  },
  methods: {
    editStudent(item) {
      this.openDialog();
      this.row = item;
    },
    deleteStudent() {
      this.$store.dispatch("students/archiveStudent", this.deleteItem);
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
      archivedStudents: (state) => state.students.archivedStudents,
      user: (state) => state.auth.user,
      deleteModalVisible: (state) => state.students.deleteModalVisible,
      modalVisible: (state) => state.students.modalVisible,
    }),

    filteredStudents() {
      const query = this.searchQuery.toLowerCase().trim();

      return this.archivedStudents
        .map((student) => {
          return {
            ...student,
            actions: ["view", "restore"],
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
