import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'editorise';
  public highlighList = ["Highlight (3-8min)", "Feature film (10-15min)", "Full length (30-60min)"]
  public userForm!: FormGroup;
  public successMessage!: string;
  public errorMessage!: string;
  public placeholderText!: string;
  public isSubmitted = false;

  today = new Date()
  minDate = ''
  constructor(private _fb: FormBuilder,
    private _userService: UserService,
    private _spinner: NgxSpinnerService) {
    this.initializeForm()
  }

  initializeForm() {
    this.userForm = this._fb.group({
      "studio_name": ['', Validators.required],
      "email": ['', Validators.required],
      "contact_number": ['', Validators.required],
      "couple_name": ['', Validators.required],
      "wedding_date": ['', Validators.required],
      "source_link": ['', Validators.required],
      "file_size": ['', Validators.required],
      "highlight": ['', Validators.required],
      "music_option": this._fb.array([this._fb.control(null)]),
      "order_date": ['', Validators.required],
      "description": ['', Validators.required]
    })
  }
  ngOnInit(): void {
    let date = new Date()
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 to month because months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    this.minDate = `${year}-${month}-${day}`;
  }

  getMusicOptionformControls(): AbstractControl[] {
    return (<FormArray>this.userForm.get('music_option')).controls
  }

  addMusic() {
    (this.userForm.get("music_option") as FormArray).push(
      this._fb.control(null)
    )
  }

  removeMusic(index: any) {
    (this.userForm.get("music_option") as FormArray).removeAt(index)
  }

  removePlaceholder(value: string) {
    this.placeholderText = '';
  }

  setPlaceholder(value: string) {
    if (!this.userForm.get(value)?.value) {
      if (value === 'wedding_date') {
        this.placeholderText = 'Wedding date';
      } else {
        this.placeholderText = 'Order date'
      }

    }
  }

  get studio_name() {
    return this.userForm.get('studio_name')!;
  }

  get userFormControl() {
    return this.userForm.controls
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.userForm.invalid) {
      for (const control of Object.keys(this.userForm.controls)) {
        this.userForm.controls[control].markAsTouched();
      }
      return;
    } else {
      this._spinner.show()
      this._userService.addUser(this.userForm.value).subscribe({
        next: (response: any) => {
          this._spinner.hide()
          this.successMessage = 'Submitted successfully'
          setTimeout(() => {
            this.successMessage = ''
            this.isSubmitted = false;
            this.userForm.reset()
          }, 3000);

        },
        error: (error: any) => {
          console.log(error)
          this._spinner.hide()
          this.errorMessage = 'Something went wrong. Please try again.'
          setTimeout(() => {
            this.errorMessage = ''
          }, 3000);

        }
      })
    }
  }

}
