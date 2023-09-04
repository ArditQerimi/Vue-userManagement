const saveDataToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const getDataFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const state = () => ({
  loading: false,
  students: [
    {
      id: 1,
      index: 1,
      name: "John Doe",
      DoB: "21-04-1997",
      municipality: "City A",
    },
    {
      id: 2,
      index: 2,
      name: "Jane Smith",
      DoB: "21-04-1997",
      municipality: "Town B",
    },

    {
      id: 3,
      index: 3,
      name: "Ardit",
      DoB: "21-04-1997",
      municipality: "Drenas",
    },

    {
      id: 4,
      index: 4,
      name: "Alice Johnson",
      DoB: "15-12-1990",
      municipality: "Village C",
    },

    {
      id: 5,
      index: 5,
      name: "Robert Williams",
      DoB: "03-08-1985",
      municipality: "Suburb D",
    },

    {
      id: 6,
      index: 6,
      name: "Sarah Brown",
      DoB: "07-06-1993",
      municipality: "City E",
    },

    {
      id: 7,
      index: 7,
      name: "Michael White",
      DoB: "29-09-1982",
      municipality: "Town F",
    },

    {
      id: 8,
      index: 8,
      name: "Emily Davis",
      DoB: "18-03-1995",
      municipality: "Suburb G",
    },

    {
      id: 9,
      index: 9,
      name: "Daniel Lee",
      DoB: "11-11-1988",
      municipality: "Village H",
    },
    {
      id: 10,
      index: 10,
      name: "Olivia Moore",
      DoB: "25-01-1998",
      municipality: "City I",
    },
  ],
  deleteModalVisible: false,
  modalVisible: false,
  archivedStudents: [],
});

const actions = {
  async fetchStudents({ commit }) {
    try {
      const studentsData = getDataFromLocalStorage("students");
      if (studentsData) {
        commit("setStudents", studentsData);
      }
    } catch (error) {
      console.error(error);
    }
  },

  async fetchArchivedStudents({ commit }) {
    try {
      const archiveStudentsData = getDataFromLocalStorage("archivedStudents");
      if (archiveStudentsData) {
        commit("setArchiveStudents", archiveStudentsData);
      }
    } catch (error) {
      console.error(error);
    }
  },
  async addStudent({ commit }, studentData) {
    try {
      commit("setAddedStudent", studentData);
    } catch (error) {
      console.error(error);
    }
  },
  async deleteStudent({ commit }, student) {
    try {
      commit("removeStudent", student.id);
    } catch (error) {
      console.error(error);
    }
  },
  async archiveStudent({ commit }, student) {
    try {
      commit("archiveStudent", student.id);
    } catch (error) {
      console.error(error);
    }
  },
  async editStudent({ commit }, updatedStudent) {
    try {
      commit("setEditedStudent", updatedStudent);
    } catch (error) {
      console.error(error);
    }
  },
  setShowDeleteModal({ commit }) {
    commit("showDeleteModal");
  },
  setHideDeleteModal({ commit }) {
    commit("hideDeleteModal");
  },
  setShowModal({ commit }) {
    commit("showModal");
  },
  setHideModal({ commit }) {
    commit("hideModal");
  },
};

const mutations = {
  setStudents(state, students) {
    state.students = students;
    saveDataToLocalStorage("students", students);
  },

  setArchiveStudents(state, archiveStudents) {
    state.archivedStudents = archiveStudents;
    saveDataToLocalStorage("archivedStudents", archiveStudents);
  },

  setAddedStudent(state, student) {
    state.students.unshift(student);
    state.modalVisible = false;
    saveDataToLocalStorage("students", state.students);
  },

  removeStudent(state, studentId) {
    const index = state.students.findIndex((s) => s.id === studentId);
    state.archivedStudents.unshift(state.students[index]);

    if (index !== -1) {
      state.students.splice(index, 1);
    }
    state.deleteModalVisible = false;
    saveDataToLocalStorage("students", state.students);
    saveDataToLocalStorage("archivedStudents", state.archivedStudents);
  },

  archiveStudent(state, studentId) {
    const index = state.archivedStudents.findIndex((s) => s.id === studentId);
    state.students.unshift(state.archivedStudents[index]);

    if (index !== -1) {
      state.archivedStudents.splice(index, 1);
    }
    state.deleteModalVisible = false;
    saveDataToLocalStorage("students", state.students);
    saveDataToLocalStorage("archivedStudents", state.archivedStudents);
  },

  setEditedStudent(state, updatedStudent) {
    const index = state.students.findIndex((s) => s.id === updatedStudent.id);
    if (index !== -1) {
      state.students[index] = updatedStudent;
    }
    state.modalVisible = false;
    saveDataToLocalStorage("students", state.students);
  },
  showDeleteModal(state) {
    state.deleteModalVisible = true;
  },
  hideDeleteModal(state) {
    state.deleteModalVisible = false;
  },
  showModal(state) {
    state.modalVisible = true;
  },
  hideModal(state) {
    state.modalVisible = false;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
