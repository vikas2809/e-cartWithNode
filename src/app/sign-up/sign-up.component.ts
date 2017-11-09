import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingInfoService } from '.././shopping-info.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user:any;
  message:String;
  userExists:String;
  userInfo:any=[];
  errorMessage:String;
  status:boolean;
  validUser:any=[];
  constructor(private router:Router,private shoppingInfoService:ShoppingInfoService) {
    this.shoppingInfoService.getAllUser().subscribe(
      userInfo => this.userInfo=userInfo,
      error => this.errorMessage =<any>error
    );
    this.status=true;
    this.shoppingInfoService.login=true;
  }

  ngOnInit() {
  }
  onSubmit(firstName,lastName,password,phone_number,email,gender,pincode,address){
    let created_at="";
    let updated_at="";
    this.user={
      firstName,lastName,password,phone_number,email,gender,pincode,address,created_at,updated_at
    };

    if(firstName!==undefined&&lastName!==undefined&&password!==undefined&&phone_number!==undefined&&email!==undefined&&gender!==undefined&&pincode!==undefined&&address!==undefined)
    {
    this.validUser= this.userInfo.filter(function(userDetail){
      console.log(userDetail.email);
      if(userDetail.email===email)
        return userDetail;
      })
      if(this.validUser.length>0)
      {
        this.userExists="User Already Exists";
        this.status=false;
      }
      if(this.validUser.length<=0)
      {
        // this.user="Invalid User";
        // this.note="Not a Member Yet???Please signup!!!";
        this.shoppingInfoService.addUser(this.user);
      //  this.message="Signup Successfullly!!!Please Login to continue!!!";
        this.router.navigate(['\login']);
      }
    }
    else
    {
      this.userExists="Empty values are not Allowed!!!";
      this.status=false;
    }

      // this.shoppingInfoService.addUser(this.user);
      // this.message="Signup Successfullly!!!Please Login to continue!!!"

  }
  ngOnDestroy() {
    this.shoppingInfoService.login=false;
  }

}
