//creating the schema of the product 

var mongoose=require('mongoose');


//defining the schema 
var product_schema=mongoose.Schema;

var productSchema=new product_schema({
    product_id: { type:Number },
    img_url: {type:String },
    product_name: {type:String },
    product_brand: {type:String },
    product_type: {type: String },
    product_price: { type:Number},
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date}
})

//creating the collection with the defined schema
var Product =mongoose.model('product',productSchema);

module.exports=Product;