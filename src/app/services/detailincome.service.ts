import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailincomeService {

  private _refreshRequired = new Subject<void>();
  
  get RefreshRequired(){
    return this._refreshRequired;
  }
  public myAppUrl: string;
  private myApi: string;
  private myApi2: string
  constructor(
    private http
  ) { }
}
