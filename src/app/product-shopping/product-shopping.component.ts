import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingInfoService } from '.././shopping-info.service';
import { Router,ActivatedRoute } from '@angular/router';
declare var gapi:any;

@Component({
  selector: 'app-product-shopping',
  templateUrl: './product-shopping.component.html',
  styleUrls: ['./product-shopping.component.css']
})
export class ProductShoppingComponent implements OnInit {
  productInfoList:any=[];
  errorMessage:String;
  user_email=String;
  userInfo:any=[];
  productCart:any=[];
  amount:Number;
  enable:boolean;
  total_quantity:Array<number>=[];
  total_price:Array<number>=[];
  final_amount:number;
  final_cart:any[];
  show:boolean=false;
  cart_msg:String;
  // isDataLoaded:boolean=false;
  public auth2:any;
  private clientId:string = '1013929086109-d3227q1h4kpijpbf7mbtuhggbb9g8k2u.apps.googleusercontent.com';
private scope = [
  'profile',
  'email',
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/contacts.readonly',
  'https://www.googleapis.com/auth/admin.directory.user.readonly'
].join(' ');

  constructor(private shoppingInfoService:ShoppingInfoService,private router:Router,private route:ActivatedRoute ) {
    this.googleInit();
    this.reloadPage();
    // console.log(this.productInfoList);
    // this.shoppingInfoService.enable();
    this.route.params.subscribe(params => {
      this.user_email = params['emailId'];
});
this.enable=false;
if(this.user_email!==undefined)
console.log(this.user_email);
    this.shoppingInfoService.logout=true;



  }
  ngOnInit() {
    this.getProductList();
     this.getUser();
      this.final_cart=this.shoppingInfoService.getCartItem();
      console.log(this.final_cart);
      if(this.final_cart.length===0)
      this.cart_msg="Your Shopping Cart is Empty";
      console.log(this.final_cart);

     console.log(this.productCart);
    //  this.isDataLoaded=true;
  }
  getProductList()
  {
    this.shoppingInfoService.getProductDetails().subscribe(
        productInfoList => this.productInfoList = productInfoList,
        error => this.errorMessage =<any>error
    );

     console.log(this.productInfoList);
  }


  public googleInit() {
    let that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: that.clientId,
        cookiepolicy: 'single_host_origin',
        scope: that.scope
      });
    });
  }
  logout()
   {
   let that=this;
   this.auth2 = gapi.auth2.getAuthInstance();
    this.auth2.signOut().then(function () {
    //  console.log(that.userName+' signed out.');
    });
   }

  addToCart(img,name,price,quantity,id)
  {
    this.show=true;
    this.enable=true;
    // console.log("inside add to cart");
    if(quantity===undefined||quantity==="0"||quantity==="")
      alert("Please Enter the quantity");
    else
    {
      let cart_img_url=img,cart_product_name=name,cart_product_price=price,cart_product_quantity=quantity,product_id=id;
      let cart_detail={
          product_img:cart_img_url,
          product_name:cart_product_name,
          product_price:cart_product_price,
          product_quantity:cart_product_quantity,
          productId:product_id
      };
      if(this.productCart.length===0){
        this.productCart.push(cart_detail);
        this.shoppingInfoService.addToCart(cart_detail);
        console.log("Inside first time");
        this.total_quantity.push(cart_detail.product_quantity);
        this.total_price.push(cart_detail.product_price);
      }
      else if(this.productCart.length>0)
      {
        // var id = this.productCart.length + 1;
        let that=this;
        var found = this.productCart.some(function (el) {
          //  alert("item already added to the cart");
          console.log(el);
          console.log(id);

          if(el.productId===id)
          {
            console.log("inside second time");
            console.log(el.product_quantity);
            console.log(quantity);
            let temp=parseInt(el.product_quantity);
            let quant=parseInt(quantity);
            el.product_quantity=temp+quant;
            console.log(el.product_quantity);
            that.total_quantity.push(quantity);
            that.total_price.push(price);
          }

          return el.productId === id;
        });
        if (!found) {
          console.log(found);
            this.productCart.push(cart_detail);
              this.shoppingInfoService.addToCart(cart_detail);
            this.total_quantity.push(cart_detail.product_quantity);
            this.total_price.push(cart_detail.product_price);
        }
      }
     // this.shoppingInfoService.addToCart(cart_detail);
    }

    console.log(this.productCart);
    console.log(this.total_quantity);
    console.log(this.total_price);

    let final=0;
     for(var i=0;i<this.total_quantity.length;i++)
     {
       for(var j=i;j<i+1;j++)
       {
         final +=this.total_quantity[i]*this.total_price[i];
       }
     }
     console.log(final);
     this.amount=final;
     console.log(this.productCart+" "+this.amount);
  }




  getUser()
  {
    console.log(this.user_email);
     this.shoppingInfoService.authenticateUser(this.user_email).subscribe(
      userInfo => this.userInfo = userInfo,
      error => this.errorMessage= <any> error
    );
    // console.log(this.userInfo);
  }
  onCheckOut()
  {
    this.router.navigate(['\checkout',{emailId:this.user_email,checkout_amount:this.amount}]);
  }
  ngOnDestroy() {
    this.shoppingInfoService.logout=false;
  }
  reloadPage()
  {
    if(localStorage.getItem('firstLoad'))
    {
      location.reload();
      localStorage.removeItem('firstLoad');
    }
    else
      localStorage.removeItem('firstLoad');
  }
}
