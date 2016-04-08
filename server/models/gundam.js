/**
 * Created by TommyChen on 4/7/2016.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var gundamSchema   = new Schema({
    name: String,
    year: Date
});
gundamSchema.methods.dudify = function() {
    // add some stuff to the users name
    this.name = this.name + '-dude';

    return this.name;
};
var Gundam= mongoose.model('gundam', gundamSchema);
module.exports =Gundam;