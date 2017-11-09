import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
declare var gapi: any;
declare var FB:any;


@Injectable()
export class ShoppingInfoService {

  logout: boolean=false;
  login: boolean=false;
  signup: boolean=false;
  token: boolean=false;

  ProductCart:any=[];


  constructor(private http:Http,private router:Router) {
    // this.logout=false;
     FB.init({
            appId: '124926898206811',
            cookie: false,
            xfbml: true,
            version: 'v2.8'
        });
  }


  getProductDetails(){
    return this.http.get('http://localhost:4040/api/v1/getAllProduct').map(res => res.json())
    .do(data => console.log(data))
    .catch(this.handleError);
}

  addToCart(product)
  {
    // console.log(product);
    this.ProductCart.push(product);
    console.log(this.ProductCart);
    // this.checkExistingProduct(this.ProductCart,product);

  }
  getCartItem()
  {
    return this.ProductCart;
  }

  // checkExistingProduct(this.ProductCart,product);
  // {

  // }


  addUser(user)
  {
   console.log(user);
   let headers = new Headers({ 'Content-Type': 'application/json' });
   let options = new RequestOptions({ headers: headers });
    //let body = JSON.stringify(user);
  // console.log(body);
   return this.http.post('http://localhost:4040/api/v1/user/create',user,options)
   .do(data => console.log(data))
   .catch(this.handleError).
   subscribe();
  }


  updateUserProfile(user_email,user)
  {
      console.log(user_email);
      let headers =new Headers({ 'Content-Type' : 'application/json'});
      let options =new RequestOptions({ headers: headers });

      return this.http.put('http://localhost:4040/api/v1/updateUser/'+user_email,user,options)
      .do( date => console.log(date))
      .catch(this.handleError)
      .subscribe();
  }

  updateAddress(user_email,user)
  {
    console.log(user_email);
    console.log(user);
     let headers =new Headers({ 'Content-Type' : 'application/json'});
     let options =new RequestOptions({ headers: headers });
     return this.http.put('http://localhost:4040/api/v1/updateUserAddress/'+user_email,user,options).do( date => console.log(date)).catch(this.handleError).subscribe();
  }
  updateUserShoppingAmount(user_email,amount)
  {
    console.log(user_email);
    console.log(amount);
    let headers =new Headers({ 'Content-Type' : 'application/json'});
    let options =new RequestOptions({ headers: headers });
    return this.http.put('http://localhost:4040/api/v1/userTotalShoppingAmount/'+user_email,amount,options).do( date => console.log(date)).catch(this.handleError).subscribe();
  }
  authenticateUser(user_email)
  {
        console.log(user_email);
        return this.http.get('http://localhost:4040/api/v1/getUser/'+user_email)
        .map((response: Response) => response.json())
        .do(data => console.log(data))
        .catch(this.handleError);
  }

  getAllUser()
  {
    return this.http.get('http://localhost:4040/api/v1/user/getAllUser')
    .map(res => res.json())
    .do(data => console.log(data))
    .catch(this.handleError);
  }


  private handleError(error: Response) {
    console.error(error);
    let message = `Error status code ${error.status} at ${error.url}`;
    return Observable.throw(message);
      }

      userLogout()
      {
        if(localStorage.getItem('login')==='userLogin'){
          localStorage.removeItem('userLogin');
          this.router.navigate(['\login']);
      }
        if(localStorage.getItem('login')==='googleLogin')
        {
            console.log("google");
            let that=this;
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
              console.log(' signed out.');
              localStorage.removeItem('login');
              that.router.navigate(['\login']);
            });
        }
        if(localStorage.getItem('login')==='facebookLogin')
        {
          console.log("inside facebook login");
          // alert("you are going to log out from facebook");
          //   console.log("facebook");
          //   console.log("logging out of facebook");
            let that=this;
            console.log("Router "+this.router);
            FB.getLoginStatus(function(response) {
                let next_that=that;
                console.log("Router "+next_that.router);
              console.log(response);
              console.log("inside get login status");
                if (response.status === 'connected') {
                  let next1_that=next_that;
  console.log("Router "+next1_that.router);

                  console.log("inside response");
                    var uid = response.authResponse.userID;
                      var accessToken = response.authResponse.accessToken;
                      alert(response);
                      console.log(uid);
                      FB.logout(function(response) {
                        let next2_that=next1_that;
                          console.log("Router "+next2_that.router);

                          alert("user is logged out");
                          localStorage.removeItem('login');
                           next2_that.router.navigate(['\login']);
                          });
                      //  localStorage.removeItem('login');
                      //   that.router.navigate(['\login']);
                    } else if (response.status === 'not_authorized') {
                        console.log("not authorized");
                         }
                         // else {
                        //     console.log("inside else");
                        //   }
                          });




            // FB.logout()
            // .then((res)=>{console.log(res)})
            //   localStorage.removeItem('login');
            //   this.router.navigate(['\login']);
        }
      }

}
