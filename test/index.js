const {query, useDataBase} = require('../lib/mysql')

// useDataBase('test').then(() => {
//   query('show full columns from user_info').then(res => {
//     console.log(res);
//   })
// });


useDataBase('test').then(() => {
  query('show tables').then(res => {
    console.log(res);
  })
});
