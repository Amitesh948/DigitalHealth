import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
public behaviourSubject= new BehaviorSubject<string>('health-it');

  constructor(private http: HttpClient) { }

  getData(apiUrl:any,endpoint: any): Observable<any> {
    const url = `${apiUrl}/${endpoint}`; 
    return this.http.get<any>(url);
  }

  postData(apiUrl : any,data: any): Observable<any> {
    return this.http.post(apiUrl, data);
  }
}
