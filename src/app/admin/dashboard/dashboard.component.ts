import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

export interface UserData {
  _id?: string;
  studio_name: string;
  contact_number: string;
  couple_name: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = [ 'studio_name', 'contact_number', 'couple_name', '_id'];
  dataSource!: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _userService: UserService,
    private _cd: ChangeDetectorRef,
    private _spinner: NgxSpinnerService,
    private _router: Router) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this._spinner.show()
    this._userService.getUsers().subscribe({
      next: (response: any) => {
        this._spinner.hide()
        this._cd.markForCheck()
        const users = response.data.map((el: any) => {
          return { _id: el._id, studio_name: el.studio_name, contact_number: el.contact_number, couple_name: el.couple_name }
        })
        // const users2 = response.data.map((el: any) => {
        //   return { _id: el._id, studio_name: el.studio_name, contact_number: el.contact_number, couple_name: el.couple_name }
        // })
        // users.push(...users2)
        // console.log(users)
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error: any) => {
        this._spinner.hide()
        console.log(error)
      }
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  detailsPage(_id: string) {
    this._router.navigate([`admin/user-details/${_id}`])
  }

}
