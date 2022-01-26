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

//get only One
app.get('/getfriandise/:id', (req, res) => {
  const id = req.params.id;
  console.log('id:',id);
  Friandise.findById(id, (err, friandise) => {
    if(err){
      //return res.status(500).json(err);
      return res.status(500).send({message:`Error al realozar la peticion`});
    }
    if(!friandise){
      return res.status(484).send({message:`Producto no existe`});
    }
    res.status(202).json({msg: `frinadise avec L'id ${friandise._id} trouve`});
    });
  });

//DELETE
app.delete('/delFriandise/:id', (req, res) => {
const id = req.params.id;
console.log('id:',id);
Friandise.findByIdAndDelete(id, (err, friandise) => {
  if(err){
    //return res.status(500).json(err);
    return res.status(500).send({message:`Error al realozar la peticion`});
  }
  if(!friandise){
    return res.status(484).send({message:`Producto no existe`});
  }
  res.status(202).json({msg: `frinadise avec L'id ${friandise._id} supprimée`});
});
});

//UPDATE
app.put('/updfriandise/:id', (req, res) => {
  const id = req.params.id; 
  const update = req.body;
  console.log('id:',id);
  Friandise.findByIdAndUpdate(id, update,  (err, friandise) => {
    if(err){
      return res.status(500).send({message:`Error al actualizar el producto: ${err} `});
    }
    res.status(200).send({friandise: friandise });
  });
  });

  app.listen(3000, ()=> { 
    console.log("j'écoute le port 3000!");
  });
  