import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IIncome } from '../interfaces/IIncome';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  public myAppUrl: string;
  public myApi: string;
  public myApi2: string;

  constructor(private http: HttpClient) 
  {
    this.myAppUrl =  environment.endpoint;
        this.myApi = 'incomes';
        this.myApi2 = "income";
  }

  getIncome():Observable<IIncome[]>{
    return this.http.get<IIncome[]>(
      `${this.myAppUrl}${this.myApi}`
  );
  }

  deleteIncome(id: number): Observable<void>{
    return this.http.delete<void>(
        `${this.myAppUrl}${this.myApi2}/${id}`
    );
}

addIncome(person: IIncome): Observable<void>{
    return this.http.post<void>(
        `${this.myAppUrl}${this.myApi2}`,person
    );
}

updateIncome(id: number, person: IIncome): Observable<void>{
    return this.http.put<void>(
        `${this.myAppUrl}${this.myApi2}/${id}`,person
    );
}

getOneIncome(id: number): Observable<IIncome>{
    return this.http.get<IIncome>(
        `${this.myAppUrl}${this.myApi2}/${id}`
    );
}

}
