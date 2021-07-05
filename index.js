const mysql = require('mysql')
const fs = require('fs');
const path = require('path');
let connection;
let returnFlag = false;
try {
  const config = fs.readFileSync(path.join(__dirname, '../mysql_config.json'))
  // console.log(config.toString())
  const configObj = JSON.parse(config.toString());
  // console.log(configObj)
  connection = mysql.createConnection(configObj);
  connection.connect();
} catch (e) {
  console.error(e);
  returnFlag = true;
}

if (returnFlag) {
  return
}

const useDataBase = (database = '') => {
  return new Promise(function (resolve) {
    connection.changeUser({ database }, function (error) {
      if (error) throw error;
      console.log('use databases');
      resolve();
    });
  })
}

const query = (sql = '') => {
  return new Promise(function (resolve) {
    connection.query(sql, function (error, result) {
      if (error) throw error;
      console.log(`${result}:` ,result);
      resolve();
    });
  })
}

connection.query('show databases', function (error, results) {
  if (error) {
    connection.end();
    throw error
  };
  console.log(results.length);
  console.log('databases: ', results);

  useDataBase('test').then(() => {
    query('show tables')
  }).finally(() => {
    connection.end();
  })
});
