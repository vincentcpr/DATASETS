const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: '127.0.0.1', 
     user:'root', 
     port: '3307',
     password: '',
     database:'datasets',
     connectionLimit: 5
});
pool.getConnection()
    .then(conn => {
    
      conn.query("SELECT SUBSTR(firstname,4,3) as creator, lastname,debit_type, card_type,count(salesforce_id) as total FROM jdd WHERE env= 'HOMOL' GROUP BY creator, debit_type, card_type")
        .then((rows) => {
          console.log(rows); 
        })
        .then((res) => {
          console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
          conn.end();
        })
        .catch(err => {
          //handle error
          console.log(err); 
          conn.end();
        })
        
    }).catch(err => {
        console.log(err)
      //not connected
    });