
//importing the product model from the models

var ShoppingCart=require('../models/shopping_cart');

exports.postCartDetails=function(request,response){
    var cart=new ShoppingCart({
        product_id: request.body.product_id,
        img_url:    request.body.img_url,
        quantity: request.body.quantity,
        product_name: request.body.product_name,
        product_price: request.body.product_price,
        total_shopping_amount: request.body.total_shopping_amount,
        created_at:new Date(),
        updated_at:request.body.updated_at
    });

    cart.save((error,res)=>{
      console.log(response.length);
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

exports.getAllCartInfo=(req,res)=>{
  ShoppingCart.find( {},(error,response)=>{
      if(error)
          res.json(error);
      res.json(response);
  });
}
