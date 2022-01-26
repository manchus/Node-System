const express = require('express') 
// express app
const app = express() 
const mongoose = require('mongoose');
const connection = mongoose.connection;
//mongo DB
const  bodyParser = require('body-parser');
//bodyParser nous permet de lire les objects JSON
const Friandise = require('./models/modFriandise');
//Nous importons le modèle de données 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//Permet de connecter Node et Angular 
const cors = require('cors');
app.use(cors());

//Connection to DataBase
mongoose.connect('mongodb://localhost:27017/bdProj',({useUnifiedTopology: true, useNewUrlParser: true }));
connection.once('open',()=>{
  console.log('Connected to MongoDB');
});

//GET - SELECT ALL
app.get('/friandises', (req,res) =>{
  Friandise.find().exec()  //se mettre en attente de la réponse de la BD.
   .then(friandise => res.status(200).json(friandise));
});

//POST - INSERT
app.post('/newFriandise',(req, res) =>{
  console.log('req.body', req.body);
 //nous créons premier l'objet JSON
  const friandise = new Friandise(req.body);
  friandise.save((err, friandise)=>{
  //friandise.insertOne((err, friandise)=>{
    if(err){
      return res.status(500).json(err);
    }
    res.status(201).json(friandise);
  });
});




  app.listen(3000, ()=> { 
    console.log("j'écoute le port 3000!");
  });
  