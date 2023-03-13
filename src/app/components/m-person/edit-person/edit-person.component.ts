import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IPerson } from 'src/app/interfaces/IPerson';
import { IRoles } from 'src/app/interfaces/IRoles';
import { PersonService } from 'src/app/services/person.service';
import { RolService } from 'src/app/services/rol.service';
import { ErrorService } from 'src/app/utils/error/error.service';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent {
  formPerson2: FormGroup;
  id: number;
  ListPerson: IPerson[] = [];
  listRol: IRoles[] = [];
  selectedOption: [] = [];

  constructor(
    private _personService: PersonService,
    private _rolesService: RolService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _errorService: ErrorService
  ){
    this.formPerson2 = this.fb.group({
      idrol: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      date_b: ['', Validators.required],
      dni: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      //state: ['', Validators.required]
    });
    this.id = 0;
    this._personService.RefreshRequired.subscribe((resukt) =>{
      this.getPersons();
    })
  }

  getPersons(){
    this._personService.getPerson().subscribe((data: IPerson[])=>{
      this.ListPerson = data;
    })
  }

  getOnePerson(id:number){
    this._personService.getOnePerson(id).subscribe((data: IPerson)=>{
      this.formPerson2.setValue({
        idrol: data.idrol,
        name: data.name,
        lastname: data.lastname,
        date_b: data.date_b,
        dni: data.dni,
        gender: data.gender,
        address: data.address,
        username: data.username,
        password: data.password,
      })
    });
    this.id =  id;
  }

  updatePerson(){
    const person: IPerson ={
      idrol: this.formPerson2.value.idrol,
      name: this.formPerson2.value.name,
      lastname: this.formPerson2.value.lastname,
      date_b: this.formPerson2.value.date_b,
      dni: this.formPerson2.value.dni,
      gender: this.formPerson2.value.gender,
      address: this.formPerson2.value.address,
      // username: this.formPerson2.value.username,
      password: this.formPerson2.value.password,
      state: 1,
    }
    person.idperson = this.id;
    console.log(person)
    this._personService.updatePerson(this.id, person).subscribe({next:()=>{
      // console.log(JSON.stringify());
      this.toastr.success('La persona se actualizo correctamente');
    } ,
    error: (e: HttpErrorResponse) =>{
      this._errorService.msjError(e);
    }})
  }

  ngOnInit() {
    this._rolesService.getRoles().subscribe(
      (options: any[]) => {
        this.listRol = options.filter(options=>options.state == 1);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
