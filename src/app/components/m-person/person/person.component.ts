import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IPerson } from 'src/app/interfaces/IPerson';
import { PersonService } from 'src/app/services/person.service';
import { ErrorService } from 'src/app/utils/error/error.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent  implements OnInit{
  listPerson: IPerson[] =[];
  searchText: any;
  constructor(
    private _personService: PersonService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _errorService: ErrorService
  ){
    this._personService.RefreshRequired.subscribe(result =>{
      this.getPerson();
    })
  }

  ngOnInit(): void {
    this.getPerson();
  }

  getPerson(){
    this._personService.getPerson().subscribe((data: IPerson[])=>{
      this.listPerson = data;
    })
  }

  deletePerson(id: number){
    Swal.fire({
      title: 'Seguro que desea eliminar',
      text: 'Se eliminara la Persona',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) =>{
      if(result.isConfirmed){
        this._personService.deletePerson(id).subscribe({next:() =>{
          this.getPerson();
          this.toastr.success('La persona fue eliminada Correctamente')
        },error: (e:HttpErrorResponse) =>{
          this._errorService.msjError(e)
        }})
      }
    })
  }
}
