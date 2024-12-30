import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
public behaviourSubject= new BehaviorSubject<string>('health-it');

  private apiUrl = 'http://103.127.29.85:4000/ndhs-master/governance-stats';

  constructor(private http: HttpClient) { }

  getData(endpoint: any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`; 
    return this.http.get<any>(url);
  }
}
