import { Resto } from '../../model/resto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestoService } from '../../service/restoService/resto.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-resto-edit',
  templateUrl: './resto-edit.component.html',
  styleUrls: ['./resto-edit.component.css'],
})
export class RestoEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  restoData: Resto[];
  //RestoProfile: any = ['Finance', 'BDM', 'HR', 'Sales', 'Admin'];
  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private restoService: RestoService,
    private router: Router
  ) {}
  ngOnInit() {
    this.updateResto();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getResto(id);
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      adresse: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }
  // Choose options with select-dropdown
  /*updateProfile(e) {
    this.editForm.get('designation').setValue(e, {
      onlySelf: true,
    });
  }*/
  
  getResto(id) {
    this.restoService.getResto(id).subscribe((data) => {
      this.editForm.setValue({
        name: data['name'],
        adresse: data['adresse'],
        email: data['email'],
        phoneNumber: data['phoneNumber'],
      });
    });
  }
  updateResto() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      adresse: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.restoService.updateResto(id, this.editForm.value).subscribe({
          complete: () => {
            this.router.navigateByUrl('/restos-list');
            console.log('Content updated successfully!');
          },
          error: (e) => {
            console.log(e);
          },
        });
      }
    }
  }
  
}