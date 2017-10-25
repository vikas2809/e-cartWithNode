
//creating the schema of the user which are going to be registered the site

var mongoose = require('mongoose');


//defining the schema of the user table

var user_schema=mongoose.Schema;
    var userSchema=new user_schema({
        userId: {type:Number},
        firstName: {type:String},
        lastName: {type:String},
        password: {type:String},
        phone_number: {type:Number},
        email: { type: String, unique: true},
        gender: {type: String},
        pincode: {type:Number},
        address: {type : String},
        city: { type:String},
        state: { type:String},
        profession: { type:String},
        date_of_birth: { type: Date},
        country: {type:String},
        total_amount: {type:String},
        created_at: { type: Date, default: Date.now() },
        updated_at: { type: Date}
    });

    //creating the collection with the defined schema
    var User = mongoose.model('user',userSchema);

    module.exports=User;
