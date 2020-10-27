var fs = require('fs');
const inscription = require('./js/inscriptionScript.js');
const connexion = require('./js/connexionScript.js');
const recuperation = require('./js/affichageScript.js');

const express = require('express');
const bodyParser = require('body-parser');
const CryptoJS = require('crypto-js');
const session = require('express-session');

let app = express();

let messages = [];
app.use(session({secret:'secret'}));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.use('/', express.static('../'));



app.post('/connexion',bodyParser.urlencoded(), async function(req,response){
    connexion.connexion(req.body.pseudo).then((user=>{
        console.log(user)
        if (user.pseudo==req.body.pseudo&&user.pass==CryptoJS.SHA1(req.body.mdp).toString()){
            session.pseudo=user.pseudo;
            session.env='homol';
            response.writeHead(301,
                {Location: '/dashboard.html'}
              );
              response.end();
        }
        else{
            //rediriger vers connection avec erreur mot de passe
            console.log("erreur mdp")
        }
    }))
    
   
})


app.post('/getRefs',bodyParser.json(),async function(req,response){
    recuperation.selectfrom(req.body.env).then(function(result){
        console.log(result);
        response.send(result)
    })
})









app.post('/addUser', bodyParser.urlencoded(), function (req, response) {
    inscription.insertinto(req.body.nom, req.body.prenom, CryptoJS.SHA1(req.body.mdp).toString(), req.body.team)
    response.writeHead(301,
        {Location: '/index.html'}
      );
      response.end();
});





app.listen(1234);