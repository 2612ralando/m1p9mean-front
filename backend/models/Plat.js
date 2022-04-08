const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema
var Plat = new Schema({
   nomPlat: {type: String},
   categorie: {type: String},
   details: {type: String},
   prix: {type: String},
   idResto : {type : String}
}, {
   collection: 'plats'
})
module.exports = mongoose.model('Plat', Plat)