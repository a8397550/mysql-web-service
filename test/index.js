const {query, useDataBase, queryDescTable, connection} = require('../lib/mysql')
const fs = require('fs');
// useDataBase('test').then(() => {
//   query('show full columns from user_info').then(res => {
//     console.log(res);
//   })
// });


// query('show databases').then(res => {
//   console.log(res);
// })

// 查看表明细
// query('show create table user_info;').then(res => {
//   console.log(res);
// })

const list = [];

// useDataBase('databaseName').then(() => {
//   query('show tables').then(res => {
//     const queryTables = [];

//     console.log('表数量:', res.length)

//     res.forEach(tableNameObj => {
//       const tableName = Object.values(tableNameObj)[0]
//       queryTables.push(query(`show create table ${tableName}`).then(res => {
//         const tableCreateSql = res[0]['Create Table']
        
//         const match = tableCreateSql.match(/COMMENT=\'.*\'/g)
      
//         return {
//           tableName, 
//           comment: match ? match[0].replace(/COMMENT=\'(.+)\'/g, '$1') : ''
//         }
//       }))
//     })


//     Promise.all(queryTables).then(tables => {
//       console.log("tableSize", tables.length);
//       console.log(JSON.stringify(tables))
//       fs.writeFileSync('./test/data.txt', JSON.stringify(tables))
//     })

//     connection.end()
//   })
// });

// useDataBase('databaseName').then(() => {
//   query('show tables').then(res => {
//     // console.log(res);
//     res.forEach(tableNameObj => {
//       const tableName = Object.values(tableNameObj)[0]
//       console.log(tableName)
//       if (tableName) {
//         queryDescTable(tableName).then(list => {
//           const find = list.find(item => {
//             // console.log(item.comment);
//             return ['联储联备'].includes(item.comment)
//           })

//           if (find) {
//             console.log(tableName)
//           }
//         })
//       }
//     })
//     // queryDescTable
//   })
// });

console.log('end');
