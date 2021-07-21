import request from '@/src/lib/http'

export const getTablesComment = (data = {
  url: '/getTablesComment'
}) => {
  return request(data)
}

export const getTableDesc = (data = {}) => {
  return request({
    data,
    url: '/getTableDesc',
  })
}

export const getTableData = (data = {}) => {
  return request({
    data,
    url: '/getTableData',
  })
}

export const querySelect = (data = {}) => {
  return request({
    data,
    url: '/querySelect',
    method: "POST"
  })
}

export default {
  getTablesComment,
  getTableDesc,
  getTableData,
  querySelect
}