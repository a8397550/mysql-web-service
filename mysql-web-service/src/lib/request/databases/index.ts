import request from '@/src/lib/http'

export const getDataBaseList = (data = {
  url: '/getDatabases'
}) => {
  return request(data)
}

export default {
  getDataBaseList
}