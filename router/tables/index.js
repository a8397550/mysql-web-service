const express = require('express')
const router = express.Router()
const {HTTP_RETURN_STATUS} = require('../../lib/config')
const {query, queryDescTable} = require('../../lib/mysql')

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/getTables', function (req, res) {
  let like = '';
  const {tableName} = req.query;
  if (tableName) {
    like = `like "%${tableName}%"`
  }
  let sql = 'show tables';

  if (like) {
    sql = `show tables ${like}`;
  }
  
  // console.log(sql);
  query(sql).then(resp => {
    res.json({
      code: HTTP_RETURN_STATUS.OK,
      data: (resp || []).map(item => Object.values(item)[0]).filter(item => item),
      message: ''
    })
  }).catch(err => {
    res.json({
      code: HTTP_RETURN_STATUS.ERROR,
      data: null,
      error: err,
      message: '查询表列表异常'
    })
  })
})


router.get('/getTableDesc', function (req, res) {
  const {tableName} = req.query;
  if (!tableName) {
    res.json({
      code: HTTP_RETURN_STATUS.PARAMS_NOT,
      data: null,
      message: 'parameter "tableName" cannot be empty'
    })
    return
  }

  queryDescTable(tableName).then(result => {
    res.json({
      code: HTTP_RETURN_STATUS.OK,
      data: result,
      message: ''
    })
  }).catch(err => {
    res.json({
      code: HTTP_RETURN_STATUS.ERROR,
      data: null,
      error: err,
      message: '查询表详情异常'
    })
  })
})

router.get('/getTableData', function (req, res) {
  let {tableName, pageSize, currentPage} = req.query;
  if (!pageSize) {
    pageSize = 10;
  }

  if (!currentPage) {
    currentPage = 1
  }

  let next = (currentPage - 1) * pageSize;

  if (!tableName) {
    res.json({
      code: HTTP_RETURN_STATUS.PARAMS_NOT,
      data: null,
      message: 'parameter "tableName" cannot be empty'
    })
    return
  }


  query(`select * from ${tableName} limit ${next},${pageSize}; `).then(result => {
    const keywork = Object.keys(result[0] || {})[0]
    console.log('keywork', keywork)
    if (keywork) {
      return query(`select count(*) from ${tableName}; `).then(tableCount => {
        res.json({
          code: HTTP_RETURN_STATUS.OK,
          data: {
            total: tableCount[0][`count(*)`],
            data: result
          },
          message: ''
        })
      })
    } else {
      res.json({
        code: HTTP_RETURN_STATUS.OK,
        data: {
          total: 0,
          data: result
        },
        message: ''
      })
    }
  }).catch(err => {
    res.json({
      code: HTTP_RETURN_STATUS.ERROR,
      data: null,
      error: err,
      message: '查询表详情异常'
    })
  })
})

// 缓存
let tempTables;

router.get('/getTablesComment', async function(req, response) {
  if (tempTables) {
    response.json({
      total: tempTables.length,
      data: tempTables,
      message: ''
    })
  }
  
  const tables = await query('show tables').then(res => {
    const queryTables = [];

    console.log('表数量:', res.length)

    res.forEach(tableNameObj => {
      const tableName = Object.values(tableNameObj)[0]
      queryTables.push(query(`show create table ${tableName}`).then(res => {
        const tableCreateSql = res[0]['Create Table']
        
        const match = tableCreateSql.match(/COMMENT=\'.*\'/g)
      
        return {
          tableName, 
          comment: match ? match[0].replace(/COMMENT=\'(.+)\'/g, '$1') : ''
        }
      }))
    })


    return Promise.all(queryTables).then(tables => {
      return tables
    })
  })

  tempTables = tables;

  response.json({
    total: tables.length,
    data: tables,
    message: ''
  })
})

router.post('/querySelect', async function(req, response) {
  const {sql} = req.body;

  query(sql).then(result => {
    response.json({
      code: HTTP_RETURN_STATUS.OK,
      data: {
        sql,
        result: result
      },
      message: ''
    })
  }).catch(err => {
    response.json({
      code: HTTP_RETURN_STATUS.ERROR,
      error: err,
      data: {
        sql
      },
      message: ''
    })
  })
})

module.exports = router