import { HttpInterceptorFn } from '@angular/common/http';
import {inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (inject(AuthenticationService).isLoggedIn()) {
    const newRequest = req.clone({ setHeaders: { Authorization: `TOKEN ${inject(AuthenticationService).getToken()}` } });
    return next(newRequest);
  }
  return next(req);
};


