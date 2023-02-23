import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscriber } from 'rxjs';
import { IPerson } from 'src/app/interfaces/IPerson';
import { IRoles } from 'src/app/interfaces/IRoles';
import { PersonService } from 'src/app/services/person.service';
import { RolService } from 'src/app/services/rol.service';
import { ErrorService } from 'src/app/utils/error/error.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent {
  listPerson: IPerson[] =[];
  formPerson: FormGroup;
  listRol: IRoles[] = [];
  selectedOption: [] = [];
  

  constructor(
    private _personService: PersonService,
    private _rolesService: RolService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _errorService: ErrorService
  ){
      this.formPerson = this.fb.group({
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
  }

  addPerson(){
    const person: IPerson = {
      idrol: this.formPerson.get('idrol')?.value,
      name: this.formPerson.get('name')?.value,
      lastname: this.formPerson.get('lastname')?.value,
      dni: this.formPerson.get('dni')?.value,
      gender: this.formPerson.get('gender')?.value,
      address: this.formPerson.get('address')?.value,
      date_b: this.formPerson.get('date_b')?.value,
      username: this.formPerson.get('username')?.value,
      password: this.formPerson.get('password')?.value,
      state: 1
    };
    this._personService.addPerson(person).subscribe({next: () =>{
      this.toastr.success('La persona fue registrada correctamente ')
    },
    error: (e: HttpErrorResponse)=>{
      this._errorService.msjError(e);
    }

    })
  }

  ngOnInit() {
    this._rolesService.getRoles().subscribe(
      (options: any[]) => {
        this.listRol = options;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  

}
