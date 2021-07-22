<template>
  <div class="table-contianer">
    <h2>查询表</h2>
    <div class="screen-form-container">
      <el-form
        :model="formInline"
        class="demo-form-inline"
        @submit.native.prevent
      >
        <el-form-item label="查询表">
          <el-input
            v-model="formInline.sql"
            placeholder="sql"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
          >查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <table-custom
      :columns="columns"
      :tableData="tableData"
    />
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      formInline: {
        sql: ''
      },
      tableList: [],
      columns: [],
      tableData: [],
      active: 0,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableName: ''
    }
  },
  mounted() {
  },
  methods: {
    onSubmit() {
      console.log(this.formInline.sql)
      this.getTableData();
    },
    handleSizeChange(value) {
      this.pageSize = value;

      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize

      this.tableData = this.allTableData.slice(start, end)
    },
    handleCurrentChange(value) {
      this.currentPage = value;
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize

      this.tableData = this.allTableData.slice(start, end)
    },
    getTableData() {
      this.$request.table.querySelect({
        sql: this.formInline.sql
      }).then(res => {
        console.log(res);
        const {result} = res.data;
        this.columns = Object.keys(result[0] || {}).map(key => {
          return {
            label: key,
            key: key
          }
        })
        this.allTableData = result.slice();
        result.length = 10;
        this.tableData = result;
        this.total = this.allTableData.length;
      }).catch(err => {
        this.$message.error(err.message);
      })
    }
  },
  setup: () => {
  }
})
</script>

<style scoped lang="scss">
.table-contianer {
  ::v-deep .tabs-container {
    height: calc(100vh - 100px);
    .el-tabs__content {
      height: 100%;
      overflow-y: auto;
      .el-tab-pane {
        padding: 24px;
      }
    }
    .el-tabs__nav-scroll {
      overflow-y: auto;
    }
  }
  ::v-deep .el-table .cell {
    white-space: nowrap;
  }
  ::v-deep .el-tabs__item {
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .screen-form {
    height: 60px;
    display: flex;
  }
}
</style>
