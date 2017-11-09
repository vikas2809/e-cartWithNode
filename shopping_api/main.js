
var express=require('express');
var mongoose=require('mongoose');
var body_parser=require('body-parser');
//  var cors=require('cors');

//connecting to the mongodb database
mongoose.connect('mongodb://localhost:27017/shoppingCart');

//creating the express application
var main=module.exports=express();

main.set('env',process.env.NODE_ENV || 'production');

main.use(body_parser.urlencoded({ extended : true}));

main.use(body_parser.json());
//   main.use(cors);
// console.log(cors);
routes=require('./routes/routes');
main.use('/api',routes);

//setting the port on which the server responds
var port = process.env.PORT || 4040;


//starting the server
main.listen(port);
console.log('Server starts on port ' + port);
