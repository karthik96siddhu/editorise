import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { LocalstorageService } from '../services/localstorage.service';

const USER_CREDENTIAL_INCORRECT = 'username or password is incorrect'
const SOMETHING_WENT_WRONG = 'Something went wrong. Please try again'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  public errorMessage!: string;
  public password = '';
  public show = false;
  constructor(private _fb: FormBuilder,
              private _userService: UserService,
              private _router: Router,
              private _localStorage: LocalstorageService) {

    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
   }

  ngOnInit(): void {
    this.password = 'password'
  }

  onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      for (const control of Object.keys(this.loginForm.controls)) {
        this.loginForm.controls[control].markAsTouched();
      }
      return;
    } else {
      this._userService.login(this.loginForm.value).subscribe({
        next: (response:any) => {
          this._localStorage.setToken(response.token)
          this._router.navigate(['/admin/dashboard'])
        },
        error: (error:any) => {
          console.log(error)
          if (error.status === 404) {
            this.errorMessage = USER_CREDENTIAL_INCORRECT
          } else if (error.status === 500) {
            this.errorMessage = SOMETHING_WENT_WRONG
          } else {
            this.errorMessage = error.message
          }
          setTimeout(() => {
            this.errorMessage = ''
          }, 5000);
        }
      })
    }
    
  }

}
