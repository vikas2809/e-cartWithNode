import { Component, OnInit } from '@angular/core';
import { ShoppingInfoService } from './shopping-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  // shoppingInfo:ShoppingInfoService;
  constructor(public shoppingInfoService: ShoppingInfoService)
  {
    this.shoppingInfoService.logout=false;
    // console.log( this.shoppingInfoService.logout);
    // console.log(this.shoppingInfo.logout);
  }
  ngOnInit() {
  //  this.shoppingInfoService.logout=false;
  }
  logout()
  {
    console.log("inside logout");
    this.shoppingInfoService.userLogout();
  }
}
