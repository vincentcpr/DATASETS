const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: '127.0.0.1',
    user: 'root',
    port: '3307',
    password: '',
    database: 'datasets',
    connectionLimit: 5
});

function selectfrom(env) {
    return new Promise((resolve, reject) => {
        pool.getConnection()
            .then(conn => {

                conn.query("SELECT SUBSTR(firstname,4,3) as creator, lastname,debit_type, card_type,count(salesforce_id) as total FROM jdd WHERE env= '" + env + "' GROUP BY creator, debit_type, card_type")
                    .then((rows) => {
                        rows.slice(',data').forEach(element => {
                           // console.log(element.creator + " " + element.lastname + " " + element.debit_type + " " + element.card_type + " " + element.total);
                        });
                        resolve(rows.slice(',data'));
                        conn.end();
                        //console.log(rows.slice(',data'))
                    })
                    .then((res) => {
                        resolve(res);
                        // console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
                        conn.end();
                    })
                    .catch(err => {
                        reject(err);
                        //handle error
                        console.log(err);
                        conn.end();
                    })
            }).catch(err => {
                console.log(err)
                //not connected
            });
    });
}
exports.selectfrom=selectfrom;
// selectfrom('homol').then((result)=>{
//     console.log(result)
// })