import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ShoppingInfoService } from '.././shopping-info.service';

@Component({
  selector: 'app-deliver-address',
  templateUrl: './deliver-address.component.html',
  styleUrls: ['./deliver-address.component.css']
})
export class DeliverAddressComponent implements OnInit {
  user_email:string;
  user_info:any=[];
  valid_details:any;
  errorMessage:String;
  userInfo:any=[];
  address:String;
  pincode:Number;
  city:String;
  state:String;
  country:String;
  updated_address:any;
  err_msg:string;
  constructor(private router:Router,private route:ActivatedRoute,private shoppingInfoService:ShoppingInfoService) {
    this.shoppingInfoService.logout=true;
    this.route.params.subscribe(params => {
      this.user_email = params['emailId'];
    });
    console.log(this.user_email);
  }

  ngOnInit() {
    this.validUser().subscribe( _=>{
      console.log('ngOnit after getUsers() ' + this.user_info);

   this.valid_details = JSON.parse(this.user_info);
   this.userInfo=Array.of(this.valid_details);
       this.address=this.userInfo[0][0].address;
         this.pincode=this.userInfo[0][0].pincode;
         this.city=this.userInfo[0][0].city;
         this.state=this.userInfo[0][0].state;
         this.country=this.userInfo[0][0].country;

   });
  }

  validUser()
  {
      return this.shoppingInfoService.authenticateUser(this.user_email).map((users)=>{
          this.user_info=JSON.stringify(users);
          // console.log('this.users  '+this.user_info);
        }).catch((error)=>{
          console.log('error'+error);
          throw error;
        });
  }
  ngOnDestroy(){
    this.shoppingInfoService.logout=false;
  }
  update(address,city,state,pincode,country)
  {
    console.log(address);
    console.log(city);
    console.log(state);
    console.log(typeof pincode);
    console.log(country);
     if(address!==undefined||city!==undefined||state!==undefined||pincode!==undefined||country!==undefined)
     {
      this.updated_address={address,city,state,pincode,country};
      console.log(this.updated_address+" "+this.user_email);
      this.shoppingInfoService.updateAddress(this.user_email,this.updated_address);
      this.err_msg="address updated successfully";
     }
     if(address===this.address&&city===this.city&&state===this.state&&pincode===this.pincode&&country===this.country)
        this.err_msg="unsuccessfull!!! Please try Again!!!";
  }
  back()
  {
    this.router.navigate(['\checkout',{emailId:this.user_email}])
  }
}
