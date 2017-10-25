
//importing the user model from the models

var User =require('../models/user');

exports.postUserDetails=(request,response)=>{
    var user=new User({
        userId:     request.body.userId,
        firstName:  request.body.firstName,
        lastName:   request.body.lastName,
        password:   request.body.password,
        phone_number: request.body.phone_number,
        email:      request.body.email,
        gender:     request.body.gender,
        pincode:    request.body.pincode,
        address:    request.body.address,
        created_at:new Date(),
        updated_at:request.body.updated_at
    });
    //creating the user document in the collections
    user.save((error,res)=>{
        if(error)
        return error;
        else
        {
            response.json({
                success:true,
                body:res
            })
        }
    })
}

//requesting for all the user details
exports.getAllUser=(req,res)=>{
    User.find( {},(error,response)=>{
        if(error)
            res.json(error);
        res.json(response);
    });
}

//requesting for the entered email and password
exports.getUserDetail=(req,res)=>{
    var user_email=req.params.entered_email;
    User.find({"email":user_email},(error,response)=>{
        if(error)
            res.json(error);
        res.json(response);
    });
}

//requesting to update the collections


exports.updateUser =(req,res)=>
{
    var emailId =req.params.entered_email;
    var updatedFirstName    =req.body.firstName;
    var updatedLastName     =req.body.lastName;
    var updatedPassword     =req.body.password;
    var updatedPhoneNumber  =req.body.phone_number;
    var updatedPincode      =req.body.pincode;
    var updatedAddress      =req.body.address;
    var updatedCity         =req.body.city;
    var updatedState        =req.body.state;
    var updatedProfession   =req.body.profession;
    var updatedDateOfBirth  =req.body.date_of_birth;
    console.log(updatedAddress);
    console.log(updatedPhoneNumber);
     User.update({email:emailId},{$set:{
                firstName:updatedFirstName,
                lastName :updatedLastName,
                password : updatedPassword,
                phone_number: updatedPhoneNumber,
                pincode: updatedPincode,
                address: updatedAddress,
                city: updatedCity,
                state: updatedState,
                profession: updatedProfession,
                date_of_birth: updatedDateOfBirth
            }},{w:1},(err,response)=>{
            if(err){
                res.json(err);
                console.log(err);
            }
            res.json(response);
            console.log(response);
        });
}

exports.updateUserAddress =(req,res)=>{
    var emailId =req.params.entered_email;
    console.log(emailId);
    var updatedPincode      =req.body.pincode;
    var updatedAddress      =req.body.address;
    var updatedCity         =req.body.city;
    var updatedState        =req.body.state;
    var updatedCountry      =req.body.country;


    console.log(updatedPincode+" "+updatedAddress+" "+updatedCity+" "+updatedState+" "+updatedCountry);
    User.update({email:emailId},{$set:{
                pincode: updatedPincode,
                address: updatedAddress,
                city: updatedCity,
                state: updatedState,
                country: updatedCountry
            }},{w:1},(err,response)=>{
                console.log("in update");
            if(err){
                res.json(err);
                console.log(err);
            }
            res.json(response);
            console.log(response);
        });
}


exports.userTotalShoppingAmount=(req,res)=>{
    var emailId =req.params.entered_email;
    console.log(emailId);
    var updatedShoppingAmount     =req.body.total_amount;
    console.log(updatedShoppingAmount);
    User.update({email:emailId},{$set:{
        total_amount: updatedShoppingAmount,
    }},{w:1},(err,response)=>{
        console.log("in update");
    if(err){
        res.json(err);
        console.log(err);
    }
    res.json(response);
    console.log(response);
});

}

// exports.updateUser = function(req,res){
//   var emaiId = req.params.entered_email;
//   Employee.findOne({email: emaiId}, function(error,user){
//       if(error){
//           console.log("In error");
//           res.json(error);
//       }

//       var updatedFirstName    =req.body.firstName;
//       var updatedLastName     =req.body.lastName;
//       var updatedPassword     =req.body.password;
//       var updatedPhoneNumber  =req.body.phone_number;
//       var updatedCity         =req.body.city;
//       var updatedState        =req.body.state;
//       var updatedProfession   =req.body.profession;
//       var updatedDateOfBirth  =req.body.date_of_birth;
//       var updatedPincode      =req.body.pincode;
//       var updatedAddress      =req.body.address;

//     //  update the user collection
//       user.firstName     = updatedFirstName;
//       user.lastName      = updatedLastName;
//       user.password      =updatedPassword
//       user.phone_number  =updatedPhoneNumber
//       user.city          =updatedCity
//       user.state         =updatedState
//       user.profession    =updatedProfession
//       user.date_of_birth =updatedDateOfBirth
//       user.pincode       =updatedPincode
//       user.address       =updatedAddress
//       user.updated_at = new Date();
//        //save the user
//       user.updateOne(function(err, response){
//           if(err){
//               res.json(err);
//           }

//           res.json(response);
//       });

//   });
// }
