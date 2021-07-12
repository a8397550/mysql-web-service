const mysql = require('mysql')
const fs = require('fs');
const path = require('path');
let connection;
let returnFlag = false;

function handleDisconnection() {
  try {
    const config = fs.readFileSync(path.join(__dirname, '../../mysql_config.json'))
    // console.log(config.toString())
    const configObj = JSON.parse(config.toString());
    console.log('连接mysql成功')
    connection = mysql.createConnection(configObj);
    connection.connect();
  } catch (e) {
    console.error(e);
    returnFlag = true;
  }

  connection.on('error', function (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('db error 执行重连:' + err.message);
      handleDisconnection();
    } else {
      throw err;
    }
  });
}

handleDisconnection();

if (returnFlag) {
  return
}

// 切换Database
const useDataBase = (database = '') => {
  return new Promise(function (resolve, reject) {
    connection.changeUser({ database }, function (error) {
      if (error) {
        reject(error)
        return
      };
      // console.log('use databases');
      resolve();
    });
  })
}

const queryDescTable = (tableName = '') => {
  return new Promise(function (resolve, reject) {
    const sql = `show full columns from ${tableName}`
    // `desc ${tableName}`
    connection.query(sql, function (error, result) {
      if (error) {
        reject(error)
        return
      };

      const list = (result || []).map(item => ({
        keyword: item.Field,
        primary: item.Key === 'PRI',
        isNotNull: item.Null === 'NO', // ture 等于 不允许空
        default: item.Default,
        dataType: item.Type,
        unique: item.Key === 'UNI',
        extra: item.Extra, // "auto_increment" 表示自增列
        comment: item.Comment,
        collation: item.Collation,
      }))
      // console.log(`${result}:` ,result);
      resolve(list);
    });
  })
}

const query = (sql = '') => {
  return new Promise(function (resolve, reject) {
    connection.query(sql, function (error, result) {
      if (error) {
        reject(error)
        return
      };
      // console.log(`${result}:` ,result);
      resolve(result);
    });
  })
}

function test() {
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
}




module.exports = {
  useDataBase,
  query,
  queryDescTable,
  connection
}