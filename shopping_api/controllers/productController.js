
//importing the product model from the models

var Product=require('../models/product');

exports.postProductDetails=function(request,response){
    var product=new Product({
        product_id: request.body.product_id,
        img_url:    request.body.img_url,
        product_name: request.body.product_name,
        product_brand: request.body.product_brand,
        product_type: request.body.product_type,
        product_price: request.body.product_price,
        created_at:new Date(),
        updated_at:request.body.updated_at
    });
    
    product.save((error,res)=>{
        if(error)
            return error;
        else
        {
            response.json({
                success:true,
                body:res
            });

        }
    })
}

//getting all the product information from the product collection
exports.getAllProductDetails=function(req,res){
    Product.find({},(error,response)=>{
        if(error)
        {
            return res.json(req,res,error);
            console.log(req+"\n"+res+"\n"+error);
        }
        res.json(response);
        console.log(response);
    });
}


// exports.getAllProductDetails = function(req,res){
//     Product.find({},function(error,response){
//         if(error){
//             return res.json(req,res,error);
//         }
//         //sending the reponse to the browser
//         res.json(response);

//     });
// }