<template>
  <el-table
    :data="tableValue"
      style="width: 100%">
      <el-table-column
        v-for="item in columns" :key="item.key"
        :prop="item.key"
        :label="item.label"
        width="100"
      />
      
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template #default="scope" style="display: block">
          <el-button v-for="item in operator" @click="handleClick(scope.row)" 
            type="text" size="small">{{item}}</el-button>
        </template>
      </el-table-column>
    </el-table>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'TableCustom',
  props: {
    columns: {
      type: Array,
      default: []
    },
    operator: {
      type: Array,
      default: []
    },
    tableData: {
      type: Array,
      default: []
    }
  },
  computed: {
    tableValue() {
      return this.tableData || this.data
    }
  },
  data() {
    return {
      data: this.tableData || []
    }
  },
  mounted() {
  },
  methods: {
    handleClick(scope) {
      console.log(scope)
      this.$emit('click', scope)
    }
  },
  setup: (props, context) => {
    // console.log(props, context)
  }
})
</script>

<style scoped lang="scss">
</style>
