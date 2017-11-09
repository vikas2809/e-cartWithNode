import { Component, OnInit, OnDestroy  } from '@angular/core';
import { ShoppingInfoService } from '.././shopping-info.service';
import { Router,ActivatedRoute } from '@angular/router';
declare var FB:any;

@Component({
  selector: 'app-check-out-page',
  templateUrl: './check-out-page.component.html',
  styleUrls: ['./check-out-page.component.css']
})
export class CheckOutPageComponent implements OnInit {
  user_email:String;
  final_cart:any=[];
  total_amount:number;
  updated_amount:any;
  constructor(private router:Router,private route:ActivatedRoute,private shoppingInfoService:ShoppingInfoService) {
    this.shoppingInfoService.logout=true;
    this.route.params.subscribe(params => {
      this.user_email = params['emailId'];
      this.total_amount= +params['checkout_amount'];
    });
    console.log(this.total_amount);
    console.log(this.user_email);
}

  ngOnInit() {
      this.final_cart=this.shoppingInfoService.getCartItem();
        console.log(this.final_cart);
  }
  deliverAddress()
  {
    this.router.navigate(['\address',{emailId:this.user_email}]);
  }
  logout()
  {
    console.log('inside logout');
	   FB.getLoginStatus((response) => {
	      console.log(response.status);
	       if (response.status === 'connected') {
		         console.log(response.status);
 		          FB.logout((response) => {
    		localStorage.removeItem("token");
    		localStorage.removeItem("userId");
    		localStorage.removeItem("isFacebook");
    	   console.log('user logout from facebook');
           this.router.navigate(['\login']);
  	    })
	     }
	    })
  }
  onCheckout(total_amount)
  {
    console.log(total_amount);
    this.updated_amount={total_amount};
    this.shoppingInfoService.updateUserShoppingAmount(this.user_email,this.updated_amount);
  }
  ngOnDestroy() {
    this.shoppingInfoService.logout=false;
  }

}
