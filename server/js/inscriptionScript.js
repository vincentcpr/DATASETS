const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: '127.0.0.1',
    user: 'root',
    port: '3307',
    password: '',
    database: 'datasets',
    connectionLimit: 5
});

function insertinto(nom,prenom,pass,team){
pool.getConnection()
    .then(conn => {
        var pseudo = prenom.substring(0, 1)+"."+nom;
        console.log(nom,prenom,pass,pseudo,team)

        conn.query("INSERT INTO user (nom, prenom, pass, pseudo, team) VALUES ('"+nom+"','"+prenom+"','"+pass+"','"+pseudo+"','"+team+"')")
            .then((rows) => {
                console.log(rows)
                conn.end();
                //console.log(rows.slice(',data')); 
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
exports.insertinto = insertinto;
//selectfrom('homol')