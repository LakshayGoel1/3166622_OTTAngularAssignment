import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/movie/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
    loginForm: FormGroup;
    loading = false;
    ifError: boolean = false;
    txtError: string = '';
    submitted = false;
    returnUrl: string = "";

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthenticationService
    ) {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        // redirect to home if already logged in
        /* if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        } */
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        //this.alertService.clear();

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authService.login(this.f['username'].value, this.f['password'].value).subscribe((data) => {                    
            this.router.navigate(['/homePage']);
        },
        error => {
            this.ifError = true;
            this.txtError = error;
            this.loading = false;
        });
    }
}
