import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IPerson } from 'src/app/interfaces/IPerson';
import { PersonService } from 'src/app/services/person.service';
import { ErrorService } from 'src/app/utils/error/error.service';

@Component({
  selector: 'app-detail-person',
  templateUrl: './detail-person.component.html',
  styleUrls: ['./detail-person.component.css']
})
export class DetailPersonComponent {

  listPerson2: IPerson[] =[];
  selectPerson: IPerson | any;

  constructor(
    private _personService: PersonService,
    private _erroService: ErrorService
  ){

  }

  getOnePerson(id: number){
    this._personService.getOnePerson(id).subscribe((data: IPerson) =>{
      this.selectPerson = data;
      console.log(this.listPerson2)
    })
  }
}
