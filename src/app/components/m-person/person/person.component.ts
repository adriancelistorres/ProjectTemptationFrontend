import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IPerson } from 'src/app/interfaces/IPerson';
import { PersonService } from 'src/app/services/person.service';
import { ErrorService } from 'src/app/utils/error/error.service';
import Swal from 'sweetalert2';
import { DetailPersonComponent } from '../detail-person/detail-person.component';
import { EditPersonComponent } from '../edit-person/edit-person.component';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent  implements OnInit{
  listPerson: IPerson[] =[];
  searchText: any;
  selectPerson: IPerson[] | any
  listPersonOne: IPerson[] = [];
  constructor(
    private _personService: PersonService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _errorService: ErrorService,
  ){
    this._personService.RefreshRequired.subscribe(result =>{
      this.getPersons();
    })

  }
  @ViewChild(DetailPersonComponent)detailview!: DetailPersonComponent;
  @ViewChild(EditPersonComponent)editview!: EditPersonComponent;

  ngOnInit(): void {
    this.getPersons();
  }

  getPersons(){
    this._personService.getPerson().subscribe((data: IPerson[])=>{
      this.listPerson = data;
    })
  }

  edit(id: number){
    this.editview.getOnePerson(id);
    console.log(id);
  }

  GetPeronsOne(id: number) {
    this.detailview.getOnePerson(id);
    console.log(id)
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
          this.getPersons();
          this.toastr.success('La persona fue eliminada Correctamente')
        },error: (e:HttpErrorResponse) =>{
          this._errorService.msjError(e)
        }})
      }
    })
  }

}
