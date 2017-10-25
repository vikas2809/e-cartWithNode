import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';


@Injectable()
export class ShoppingInfoService {

  logout: boolean=false;
  login: boolean=false;
  signup: boolean=false;


  ProductCart:any=[];


  constructor(private http:Http) {
    // this.logout=false;
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
}
