<script lang="ts">
import DialogComponent from "@/components/DialogComponent.vue";
export default {
  components: {
    DialogComponent,
  },
  name: "TableComponent",
  props: {
    message: {
      type: String,
      required: false,
    },

    items: {
      type: Array,
      required: true,
    },

    editItem: {
      type: Function,
      required: false,
    },
    deleteItem: {
      type: Function,
      required: false,
    },
    viewItem: {
      type: Function,
      required: false,
    },
    restoreItem: {
      type: Function,
      required: false,
    },
  },
  watch: {
    items(value) {
      console.log(value);
    },
  },
  data() {
    return {
      dialogVisible: false,
      row: {},
      currentPage: 1,
      pageSize: 6,
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
    },
  },
  computed: {
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.items.slice(startIndex, endIndex);
    },
  },
};
</script>
<template>
  <el-container direction="vertical">
    <el-row>
      <el-col :span="24">
        <el-table :data="paginatedItems" border style="width: 100%">
          <el-table-column label="Index" prop="index"></el-table-column>
          <el-table-column label="Name" sortable prop="name"></el-table-column>
          <el-table-column
            label="Date of Birth"
            sortable
            prop="DoB"
          ></el-table-column>
          <el-table-column
            label="Municipality"
            sortable
            prop="municipality"
          ></el-table-column>

          <el-table-column label="Actions">
            <template v-slot="scope">
              <el-row class="mb-4">
                <el-button
                  v-if="scope.row.actions?.includes('edit')"
                  @click="editItem(scope.row)"
                  type="success"
                  style="text-align: center"
                >
                  Edit
                </el-button>
                <el-button
                  v-if="scope.row.actions?.includes('delete')"
                  @click="deleteItem(scope.row)"
                  type="danger"
                  style="text-align: center"
                >
                  Delete
                </el-button>
                <el-button
                  v-if="scope.row.actions?.includes('view')"
                  @click="editItem(scope.row)"
                  type="danger"
                  style="text-align: center"
                >
                  View
                </el-button>

                <el-button
                  v-if="scope.row.actions?.includes('restore')"
                  @click="deleteItem(scope.row)"
                  type="success"
                  style="text-align: center"
                >
                  Restore
                </el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-pagination
          background
          style="display: flex; justify-content: end !important"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[6, 12, 18, 24]"
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="items.length"
        ></el-pagination>
      </el-col>
    </el-row>
  </el-container>
</template>
<style scoped></style>
