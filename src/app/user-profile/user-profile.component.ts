import { Component, OnInit ,OnDestroy } from '@angular/core';
import { ShoppingInfoService } from '.././shopping-info.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  // providers: [ShoppingInfoService]
})
export class UserProfileComponent implements OnInit {
  user_email:string;
  updated_user:any;
  user_detail:any=[];
  user_info:any=[];
  valid_details:any;
  errorMessage:String;
  date:Date;
  userInfo:any=[];

  firstName:String;
  lastName:String;
  address:String;
  pincode:Number;
  phone_number:Number;
  email:string;
  password:string;
  city:string;
  state:string;
  profession:string;

  err_msg:string;
  constructor(private shoppingInfoService:ShoppingInfoService,private router:Router,private route:ActivatedRoute) {
    this.shoppingInfoService.logout=true;
    this.route.params.subscribe(params => {
      this.user_email = params['user_email'];
});
    // console.log(this.user_email);
    // if(this.user_info.length>0)
    // console.log(this.user_info);
    // if(this.user_email!==undefined)
    // {
    //   this.shoppingInfoService.authenticateUser(this.user_email).subscribe(
    //       user_detail => this.user_detail = user_detail,
    //       error => this.errorMessage =<any>error
    //   );
    // }
    // this.shoppingInfoService.logout=true;
   }

  ngOnInit() {
    this.validUser().subscribe( _=>{
      this.valid_details = JSON.parse(this.user_info);
      this.userInfo=Array.of(this.valid_details);
      this.firstName=this.userInfo[0][0].firstName;
        this.lastName=this.userInfo[0][0].lastName;
          this.address=this.userInfo[0][0].address;
            this.pincode=this.userInfo[0][0].pincode;
              this.phone_number=this.userInfo[0][0].phone_number;
                this.email=this.userInfo[0][0].email;
                  this.password=this.userInfo[0][0].password;
                  this.city=this.userInfo[0][0].city;
                  this.state=this.userInfo[0][0].state;
                  this.profession=this.userInfo[0][0].profession;
       console.log(this.phone_number+" "+typeof this.phone_number);
    });
    this.getUser();
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

  getUser()
  {
    console.log(this.user_email);
     this.shoppingInfoService.authenticateUser(this.user_email).subscribe(
      user_detail => this.user_detail = user_detail,
      error => this.errorMessage= <any> error
    );

  }
  back()
  {
    this.router.navigate(['\dashboard',{emailId:this.user_email}]);
  }
  updateProfile(firstName,lastName,address,city,state,pincode,profession,date_of_birth,phone_number,email,password)
  {
      console.log(firstName);
      console.log(lastName);
      console.log(address);
      console.log(city);
      console.log(state);
      console.log(pincode +" "+typeof pincode);
      console.log(profession);
      console.log(typeof date_of_birth);
      console.log(typeof phone_number);
      console.log(password);
      let updated_at=Date.now().toString();
      if(firstName!==undefined||lastName!==undefined||address!==undefined||city!==undefined||state!==undefined||pincode!==undefined||profession!==undefined||phone_number!==undefined||password!==undefined)
      {
          this.updated_user={
          firstName,lastName,password,address,city,state,pincode,profession,date_of_birth,phone_number,updated_at
          };
          this.shoppingInfoService.updateUserProfile(this.user_email,this.updated_user);
          this.err_msg="profile updated successfully";
       }
       if(firstName===this.firstName&&lastName===this.lastName&&address===this.address&&city===this.city&&state===this.state&&this.password===password&&profession===this.profession&&pincode===this.pincode&&phone_number===this.phone_number)
        this.err_msg="unsuccessfull!!! Please try Again!!!";
  }
  ngOnDestroy() {
    this.shoppingInfoService.logout=false;
  }
}
