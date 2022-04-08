const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema
var Resto = new Schema({
   name: {
      type: String
   },
   adresse: {
      type: String
   },
   email: {
      type: String
   },
   phoneNumber: {
      type: Number
   }
}, {
   collection: 'restos'
})
module.exports = mongoose.model('Resto', Resto)