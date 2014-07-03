var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var Measurement = new Schema(
  {
    "date"    : Date,
    "temperature" : Number
  },
  {
    collection : 'measurements'
  }
);

mongoose.model('Measurement', Measurement);
mongoose.connect('mongodb://ec2-54-88-73-46.compute-1.amazonaws.com/greenhouse');
