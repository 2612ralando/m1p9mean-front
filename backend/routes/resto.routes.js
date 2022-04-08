const express = require('express');
//const { ObjectUnsubscribedError } = require('rxjs');
const app = express();
const restoRoute = express.Router();

// Resto model
let Resto = require('../models/Resto');

// Add Resto
restoRoute.post('/create',(req, res) => {

  var restau = new Resto({
    name : req.body.name,
    adresse : req.body.adresse,
    email : req.body.email,
    phoneNumber : req.body.phoneNumber,
  });
  restau.save((err, doc) => {
    if(!err) { res.send(doc);}
    else {console.log('Error in Resto Save :' + JSON.stringify(err, undefined, 2));}
  });
});

/*restoRoute.post('/create',(req, res, next) => {
  Resto.create(req.body, (err, data) => {
    if (err) {
      return next(err)
    } else {
      res.json(data)
    }
  })
});*/

// Get All Resto
/*restoRoute.get('/',(req, res) => {
  Resto.find((err, docs) => {
    if (!err) {res.send(docs);}
    else {console.log('Error in Retriving Resto :' + JSON.stringify(err, undefined, 2));}
  });
});*/

restoRoute.route('/').get((req, res) => {
  Resto.find((err, data) => {
    if (err) {
      return next(err)
    } else {
      res.json(data)
    }
  })
})

// Get single resto
/*restoRoute.get('read/:id',(req, res) => {
  if(!ObjectId.isValid(req.params.id))
  return res.status(400).send(`No record with given id : ${req.params}`)

  Resto.findById(req.params.id, (err, doc) => {
    if (!err) {res.send(doc);}
    else {console.log('Error in Retriving Resto  :' + JSON.stringify(err, undefined, 2));}
  });
});*/

restoRoute.route('/read/:id').get((req, res,next) => {
  Resto.findById(req.params.id, (err, data) => {
    if (err) {
      return next(err)
    } else {
      res.json(data)
    }
  })
})

// Update resto
/*restoRoute.put('update/:id',(req, res) => {
  if(!ObjectId.isValid(req.params.id))
  return res.status(400).send(`No record with given id : ${req.params}`)

  var restau = {
    name : req.body.name,
    adresse : req.body.adresse,
    email : req.body.email,
    phoneNumber : req.body.phoneNumber,
  };

  Resto.findByIdAndUpdate(req.params.id, {$set: restau},{new : true}, (err,doc)=>{
    if (!err) {res.send(doc);}
    else {console.log('Error in Resto Update :' + JSON.stringify(err, undefined, 2));}

  });
});*/

restoRoute.route('/update/:id').put((req, res, next) => {
  Resto.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (err, data) => {
    if (err) {
      return next(err);
      console.log(err)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})
// Delete resto
/*restoRoute.delete('/delete/:id',(req, res) => {
  if(!ObjectId.isValid(req.params.id))
  return res.status(400).send(`No record with given id : ${req.params}`)
  
  Resto.findOneAndRemove(req.params.id, (err, doc) => {
    if (!err) {res.send(doc);}
    else {console.log('Error in Resto Delete :' + JSON.stringify(err, undefined, 2));}
  });
});*/

restoRoute.route('/delete/:id').delete((req, res, next) => {
  Resto.findOneAndRemove(req.params.id, (err, data) => {
    if (err) {
      return next(err);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})
module.exports = restoRoute;