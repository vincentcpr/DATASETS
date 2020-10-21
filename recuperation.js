const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: '127.0.0.1',
    user: 'root',
    port: '3307',
    password: '',
    database: 'datasets',
    connectionLimit: 5
});

function recuperer(lastname,debit_type, card_type,env){
pool.getConnection()
    .then(conn => {
        
        conn.query("SELECT salesforce_id as id FROM jdd WHERE status=0 AND lastname='"+lastname+"' AND debit_type= '"+debit_type+"'AND card_type= '"+card_type+"' AND env= '"+env+"'LIMIT 1;")
            .then((rows) => {
                rows.slice(',meta').forEach(element => {
                    console.log(element.id);
                });
                conn.end();
            })
            .then((res) => {
               // console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
                conn.end();
            })
            .catch(err => {
                //handle error
                console.log(err);
                conn.end();
            })
        pool.end();
    }).catch(err => {
        console.log(err)
        //not connected
    });
}

recuperer('MIGHOMOLCLDI','DI','classique','homol')