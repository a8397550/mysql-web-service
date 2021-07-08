const express = require('express')
const router = express.Router()
const {HTTP_RETURN_STATUS} = require('../../lib/config')
const {query, useDataBase} = require('../../lib/mysql')

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/getDatabases', function (req, res) {
  query("show databases").then(resp => {
    res.json({
      code: HTTP_RETURN_STATUS.OK,
      data: resp,
      message: ''
    })
  })
})

router.get('/setDatabases', function (req, res) {
  const params = req.params;
  const {database} = req.query;
   
  if (!database) {
    res.json({
      code: HTTP_RETURN_STATUS.PARAMS_NOT,
      data: null,
      message: 'parameter "database" cannot be empty'
    })
    return 
  }

  useDataBase(database).then(resp => {
    res.json({
      code: HTTP_RETURN_STATUS.OK,
      data: 'success',
      message: ''
    })
  }).catch(err => {
    res.json({
      code: HTTP_RETURN_STATUS.ERROR,
      data: null,
      error: err,
      message: '数据库切换失败'
    })
  })
})


module.exports = router