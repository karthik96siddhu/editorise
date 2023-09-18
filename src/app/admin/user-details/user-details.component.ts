import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public userDetail!: User;
  constructor(private _router: Router,
              private _activateRoute: ActivatedRoute,
              private _userService: UserService,
              private _spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    const id = this._activateRoute.snapshot.params['id'];
    if (id) {
      this.getUserDetails(id)
    }
  }

  getUserDetails(userID:string) {
    this._spinner.show()
    this._userService.getUser(userID).subscribe({
      next: (response:any) => {
        this._spinner.hide()
        this.userDetail = response.user
      },
      error: (error: any) => {
        console.log(error)
        this._spinner.hide()
      }
    })
  }

}
