import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './_models/user';
import { AuthenticationService } from './_services/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'practiceApp';
  fontColor = 'red';
  sayHelloId = 1;
  canClick = false;
  message = 'Hello, World';
  chart: any = [];
  //Login
  user: User;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.user.subscribe(x => this.user = x);

  }
  logout() {
    this.authenticationService.logout()
  }


  sayMessage() {
    alert(this.message);
  }
  ngOnInit() {

  }


}
