import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingInfoService } from '.././shopping-info.service';
declare var gapi:any;
declare var FB:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild("login", {read: ElementRef}) login: ElementRef;
  user: string;
  note: string;
  validUser:any=[];
  userInfo:any=[];
  errorMessage:string;
  name:string;
  facebook_user:any;
  google_user:any;
 welcome:String='Welcome ';
 //user:any={};
 user_detail:any={};
private clientId:string = '1013929086109-d3227q1h4kpijpbf7mbtuhggbb9g8k2u.apps.googleusercontent.com';
private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');

  public auth2: any;


  constructor(private element: ElementRef,private router:Router,public shoppingInfoService:ShoppingInfoService) {
      this.shoppingInfoService.getAllUser().subscribe(
        userInfo => this.userInfo=userInfo,
        error => this.errorMessage =<any>error
      );
      this.shoppingInfoService.signup=true;
      console.log('ElementRef: ', this.element);
     this.googleInit();
    console.log(this.name);
    FB.init({
          appId: '124926898206811',
          cookie: false,
          xfbml: true,
          version: 'v2.8'
      });
  }
  public googleInit() {
    let that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: that.clientId,
        cookiepolicy: 'single_host_origin',
        scope: that.scope
      });
      that.attachSignin(that.login.nativeElement);
      console.log(that.login.nativeElement);
    });
  }
   public attachSignin(element) {
    let that = this;
    this.auth2.attachClickHandler(element, {},
      function(googleUser) {

        var profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        that.name=profile.getName();
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        console.log(that.name);



        that.user_detail.id=profile.getId();
        that.user_detail.name= profile.getName();
        that.user_detail.email= profile.getEmail();
        that.user_detail.imageUrl= profile.getImageUrl();
        that.user_detail.givenName= profile.getGivenName();
        that.user_detail.familyName= profile.getFamilyName();
        localStorage.setItem("firstLoad","firstLoad");
        let created_at="";
        let updated_at="";
        let firstName=that.user_detail.name;
        let lastName=that.user_detail.familyName;
        let email=that.user_detail.email;
        that.google_user={
          firstName,lastName,email,created_at,updated_at
        };
        localStorage.setItem('login','googleLogin');
           that.shoppingInfoService.addUser(that.google_user);
        that.router.navigate(['\dashboard',{emailId:that.user_detail.email,id:that.user_detail.id,name:that.user_detail.name,imageUrl:that.user_detail.imageUrl}]);
        // that.router.navigate(['\dashboard']);
      }, function(error) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }
  facebookLogin(){
  	FB.login((response: any) => {
    if (response.status === 'connected') {
       this.me(response.authResponse.userID, response.authResponse.accessToken);
        // Logged into your app and Facebook.
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
    } else {

        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
    }

	}, {scope: 'user_friends,email'});
}
me(userId, accessToken) {
    FB.api(
        "/" + userId + '?fields=id,name,first_name,email,gender,picture.width(150).height(150),age_range,friends',
        (result) => {
        this.user_detail.name=result.name;
        this.user_detail.id=result.id;
        this.user_detail.gender=result.gender;
        this.user_detail.imageUrl=result.picture;
        this.user_detail.email=result.email;
        this.user_detail.firstName=result.first_name;
        this.user_detail.lastName=this.user_detail.name.replace(this.user_detail.firstName,'');
        console.log(typeof this.user_detail.lastName);
            console.log("result===", this.user_detail);
            let created_at="";
            let updated_at="";
            let firstName=this.user_detail.firstName;
            let lastName=this.user_detail.lastName;
            let email=this.user_detail.email;
            let gender=this.user_detail.gender;
             this.facebook_user={
               firstName,lastName,email,gender,created_at,updated_at
             };
            if (result && !result.error) {
              localStorage.setItem('login','facebookLogin');
                this.shoppingInfoService.addUser(this.facebook_user);
               this.router.navigate(['\dashboard',{emailId:this.user_detail.email,id:this.user_detail.id,name:this.user_detail.name,imageUrl:this.user_detail.imageUrl}]);
}
})

}
  ngOnInit() {
    // this.getValidUser();
    // console.log(this.userName);
     console.log(this.name);
  }
  // getValidUser(entered_email)
  // {
  //   console.log(entered_email);
  //   return this.shoppingInfoService.authenticateUser(entered_email).subscribe(
  //     userInfo => this.userInfo = userInfo,
  //       error => this.errorMessage =<any>error
  //   );
  // }

  onAuthentication(entered_email,entered_password)
  {
    // console.log(entered_email);
    // this.validUser=this.getValidUser(entered_email);
    if(entered_email!==undefined&&entered_password!==undefined)
    {
      this.validUser= this.userInfo.filter(function(user){

      if(user.email===entered_email && user.password===entered_password)
        return user;
      })
      console.log(this.validUser);
      if(this.validUser.length>0)
      {
        this.shoppingInfoService.token=true;
        localStorage.setItem('userLogin',JSON.stringify(this.shoppingInfoService.token));
        localStorage.setItem('login','userLogin');
        this.router.navigate(['\dashboard',{emailId:entered_email}]);
      }
      if(this.validUser.length<=0)
      {
        this.user="Invalid User";
        this.note="Not a Member Yet???Please signup!!!";
      }
    }
    else
    {
      this.user="Invalid User";
      this.note="Not a Member Yet???Please signup!!!";
    }
  }
  onSignup(){
    this.router.navigate(['\signup']);
  }
  ngOnDestroy() {
    this.shoppingInfoService.signup=false;
  }
}
