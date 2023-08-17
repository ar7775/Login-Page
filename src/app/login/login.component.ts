import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = true;
  showPassword: boolean = false;
  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar) 
  {
    this.form = this.fb.group({
      User: ['', Validators.compose([
          Validators.required,
          Validators.email
        ])],
      Password: ['', Validators.compose([
          Validators.required,
          Validators.minLength(6)
        ])]
    })
  }
  ngOnInit(): void {
  }

  submit() {
    console.log(this.form);
    //  this.router.navigateByUrl('/dashboard');
    const user = this.form.value.User;
    const Password = this.form.value.Password;
    if (user == "test@test.com" && Password == "test123") {
      console.log(this.form.value.User);
      console.log(this.form.value.Password);
      this._snackBar.open('Login Successful', '', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000
      })
    }
    else {
      console.log(this.form.value.User);
      this.error();
    }
  }

  error() {
    this._snackBar.open('Email or password is incorrect', '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 5000
    })
  }

  isValid(controlName: string, validationType: string): boolean {
    const control = this.form.controls[controlName];
    if (!control) return false;
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return !result;
  }

  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }
}
