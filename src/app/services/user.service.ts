import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public apiBaseURL = environment.apiBaseURL
  constructor(private _http: HttpClient) { }

  addUser(data:any) {
    return this._http.post(this.apiBaseURL + 'users', data)
  }

  getUsers() {
    return this._http.get(this.apiBaseURL + 'users')
  }

  getUser(userID: string) {
    return this._http.get(this.apiBaseURL + 'user/' + userID)
  }

  login(data:any) {
    return this._http.post(this.apiBaseURL + 'login', data)
  }
}
