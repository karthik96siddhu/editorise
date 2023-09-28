import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalstorageService } from './services/localstorage.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  
  constructor(private _localStorageService:LocalstorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this._localStorageService.getToken()
    const modified = request.clone({
      setHeaders: {Authorization: `${token}`}
    })
    return next.handle(modified);
  }
}
