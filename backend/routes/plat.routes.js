const express = require('express');
const app = express();
const platRoute = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

// Plat model
let Plat = require('../models/Plat');

// Add Plat
/*platRoute.post('/create',(req, res, next) => {
    Plat.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});*/

platRoute.post('/create',(req, res) => {
  var plat = new Plat({
    nomPlat : req.body.nomPlat,
    categorie : req.body.categorie,
    details : req.body.details,
    prix : req.body.prix,
    idResto : req.body.idResto,
  });
  plat.save((err, doc) => {
    if(!err) { res.send(doc);}
    else {console.log('Error in Plat Save :' + JSON.stringify(err, undefined, 2));}
  });
});

// Get All Plat
/*platRoute.route('/').get((req, res) => {
  Plat.find((err, data) => {
    if (err) {
      return next(err)
    } else {
      res.json(data)
    }
  })
})*/

platRoute.get('/',(req, res) => {
  Plat.find((err, data) => {
    if (!err) {res.send(data);}
    else {console.log('Error in Retriving Plat  :' + JSON.stringify(err, undefined, 2));}
  });
});


// Get single Plat
platRoute.get('read/:id',(req, res) => {
  if(!ObjectId.isValid(req.params.id))
  return res.status(400).send(`No record with given id : ${req.params}`)

  Plat.findById(req.params.id, (error, doc) => {
    if (!err) {res.send(doc);}
    else {console.log('Error in Retriving Plat  :' + JSON.stringify(err, undefined, 2));}
  });
});

// Update Plat
platRoute.put('/update/:id',(req, res, next) => {
  if(!ObjectId.isValid(req.params.id))
  return res.status(400).send(`No record with given id : ${req.params}`)

  var plat = {
    nomPlat : req.body.nomPlat,
    categorie : req.body.categorie,
    details : req.body.details,
    prix : req.body.prix,
    idResto : req.body.idResto,
  };

  Plat.findByIdAndUpdate(req.params.id, {$set: plat},{new : true}, (err,doc)=>{
    if (!err) {res.send(doc);}
    else {console.log('Error in Plat Update :' + JSON.stringify(err, undefined, 2));}

  });
});
// Delete Plat
platRoute.delete('/delete/:id',(req, res, next) => {
  if(!ObjectId.isValid(req.params.id))
  return res.status(400).send(`No record with given id : ${req.params}`)
  
  Plat.findOneAndRemove(req.params.id, (err, doc) => {
    if (!err) {res.send(doc);}
    else {console.log('Error in Plat Delete :' + JSON.stringify(err, undefined, 2));}
  });

})

/*platRoute.route('/delete/:id').delete((req, res, next) => {
  Plat.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})*/
module.exports = platRoute;