import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private http: HttpClient // instanceof HttpClient
  ) { }

  getAllData(endpoint: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${endpoint}`)
 }

 postData(endpoint: any, data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${endpoint}`, data)
 }

 updateData(endpoint: string, data: object): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/${endpoint}`, data)
 }
 
}
