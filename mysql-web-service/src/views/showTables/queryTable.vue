<template>
  <div class="table-contianer">
    <div class="screen-form">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        @submit.native.prevent
      >
        <el-form-item label="筛选表">
          <el-input
            v-model="formInline.tableName"
            placeholder="筛选表"
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
    <el-tabs v-model="tableName" @tab-click="tabChange" tab-position="left" class="tabs-container">
      <el-tab-pane v-for="(item, index) in tableList" 
        :key="item.tableName" 
        :name="item.tableName"
        :label="item.comment || item.tableName">
          <h2>{{item.comment}}  {{item.tableName}}</h2>
          <table-custom v-if="active === index"
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
              :total="total">
            </el-pagination>
          </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import {getUrlParams} from 'utils/util'

export default defineComponent({
  data() {
    return {
      formInline: {
        tableName: ''
      },
      tableList: [],
      columns: [],
      tableData: [],
      active: 0,
      currentPage: 1,
      pageSize: 10,
      total: 400,
      tableName: ''
    }
  },
  mounted() {
    this.getTablesComment();
  },
  methods: {
    onSubmit(value) {
      this.oldTableList = this.oldTableList || this.tableList;

      this.tableList = this.oldTableList.filter(item => {
        const {tableName} = (this.formInline || {});
        if (!tableName) {
          return true;
        }
        return (item.comment).includes(tableName) || (item.tableName).includes(tableName) 
      })
    },
    handleSizeChange(value) {
      this.pageSize = value;
      this.getTableData(this.tableName)
    },
    handleCurrentChange(value) {
      this.currentPage = value;
      this.getTableData(this.tableName)
    },
    tabChange({index}) {
      const ind = Number(index);
      this.active = ind;
      const tableName = this.tableList[ind]?.tableName;
      this.getTableData(tableName)
      try {
        let href = location.pathname;
        href = href + `?tableName=${tableName}`
        history.replaceState(null, null, href)
      } catch (err) {
        console.error(err);
      }
    },
    getTablesComment() {
      console.log(getUrlParams())
      this.$request.table.getTablesComment().then(res => {
        this.tableList = res.data || [];
        const tempTableName = getUrlParams().tableName;
        let find
        if (tempTableName) {
          find = this.tableList.find(item => item.tableName === tempTableName)
          this.active = this.tableList.findIndex(item => item.tableName === tempTableName)
          if (this.active === -1) {
            this.active = 0;
          }
        }

        if (this.tableList.length) {
          this.getTableData(find?.tableName || this.tableList[this.active]?.tableName)
        }
      })
    },
    getTableData(tableName) {
      if (tableName) {
        this.$request.table.getTableDesc({tableName}).then(res => {
          this.columns = res.data.map(item => {
            return {
              key: item.keyword,
              label: item.comment || item.keyword
            }
          })
        })
     
        this.$request.table.getTableData({
          tableName,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        }).then(res => {
          this.tableData = res.data.data || []
          this.total = res.data.total || 0;
        })

        this.tableName = tableName
      }
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
