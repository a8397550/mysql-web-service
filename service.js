/*
 * @Author: lijunyang
 * @Date: 2021-07-01 14:25:35
 * @LastEditTime: 2021-07-21 13:45:20
 * @LastEditors: lijunyang
 * @Description: 
 */
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const {
  databasesRouter,
  tablesRouter
} = require('./router')
const port = process.env.PORT || 8888;
app.set('port', port);

app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
  extended: true
}));

// 设置跨域访问  
app.all('*', function(req, res, next) {  
  console.log("res")
  res.header("Access-Control-Allow-Origin", `*`);  
  res.header("Access-Control-Allow-Headers", "X-Requested-With, content-type");  
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
  res.header("X-Powered-By",' 3.2.1')  
  res.header("Content-Type", "application/json;charset=utf-8");  
  next();  
});  

app.get('/', function (req, res) {
  const data = fs.readFileSync(__dirname + '/view/index.html')
  res.setHeader("content-type", "text/html; charset=utf-8")
  res.end(data)
})

app.use(express.static(__dirname + '/public'));

app.use(databasesRouter);
app.use(tablesRouter)


app.listen(app.get('port'), function () {
  console.log(`Express started on http://localhost:${app.get('port')}; press Ctrl + c to terminate.`);
});