import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/_services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  profileForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';


  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    //redirect to home if lalready loggedin
    if (this.authenticationService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {

    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  //set getter for easy form access
  get f() { return this.profileForm.controls }

  onSubmit() {
    this.submitted = true;

    //stop for invalid form
    if (this.profileForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {

          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;

        });

  }

}



