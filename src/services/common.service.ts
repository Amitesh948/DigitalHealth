import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  presentValueSignal =  signal<{ key: string; taxonomyKey: string ;countryName:{firstCountry : string , secondCountry : string}; countryData: { firstCountry: number; secondCountry: number } }[]>([]);
  prospectiveValueSignal =  signal<{ key: string; taxonomyKey: string ;countryName:{firstCountry : string , secondCountry : string} ; countryData: { firstCountry: number; secondCountry: number } }[]>([]);
  changeToggleButton = signal('health-it');
  private hasSelectedIdBeenSetSubject = new BehaviorSubject<boolean>(false);
  hasSelectedIdBeenSet$ = this.hasSelectedIdBeenSetSubject.asObservable();

  headerToggleButtonSignal= signal('mainPage');

  constructor(private http: HttpClient) { }

  get hasSelectedIdBeenSet(): boolean {
    return this.hasSelectedIdBeenSetSubject.value;
  }

  setHasSelectedIdBeenSet(value: boolean): void {
    this.hasSelectedIdBeenSetSubject.next(value);
  }

  getData(apiUrl: any, endpoint: any): Observable<any> {
    const url = `${apiUrl}/${endpoint}`;
    return this.http.get<any>(url);
  }

  postData(apiUrl: any, data: any): Observable<any> {
    return this.http.post(apiUrl, data);
  }
}
