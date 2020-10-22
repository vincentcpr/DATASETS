const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: '127.0.0.1',
    user: 'root',
    port: '3307',
    password: '',
    database: 'datasets',
    connectionLimit: 5
});

async function connexion(pseudo) {
    var user;
    return new Promise((resolve,reject)=>{
    pool.getConnection()
        .then(conn => {
            //console.log(pseudo)

            conn.query("SELECT pseudo, pass FROM user WHERE PSEUDO='" + pseudo + "'")
                .then((rows) => {
                    user = rows.slice(',data')[0]
                    conn.end();
                    resolve(user)
                    //console.log(rows.slice(',data')); 
                })
                .then((res) => {
                    resolve(user)
                    //console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
                    conn.end();
                })
                .catch(err => {
                    reject(err)
                    //handle error
                    console.log(err);
                    conn.end();
                })
            
        }).catch(err => {
            console.log(err)
            //not connected
        });
    })
}
exports.connexion = connexion;
//connexion('v.charpentier')