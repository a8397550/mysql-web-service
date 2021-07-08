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

module.exports = router