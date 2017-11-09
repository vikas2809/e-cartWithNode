//crating the schema of the shopping cart

var mongoose=require('mongoose');

//defining the schema
var cart_schema=mongoose.Schema;

var cartSchema=new cart_schema({
    product_id: { type:Number },
    img_url: {type:String },
    quantity: {type:Number},
    product_name: {type:String },
    product_price: { type:Number},
    total_shopping_amount: { type:Number},
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date}
})

//creating the collection with the defined schema
var ShoppingCart =mongoose.model('shopping_cart',cartSchema);

module.exports=ShoppingCart;
