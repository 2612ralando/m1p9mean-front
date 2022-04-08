import { Router } from '@angular/router';
import { RestoService } from '../../service/restoService/resto.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-resto-create',
  templateUrl: './resto-create.component.html',
  styleUrls: ['./resto-create.component.css'],
})
export class RestoCreateComponent implements OnInit {
  submitted = false;
  restoForm: FormGroup;
  //RestoProfile: any = ['Finance', 'BDM', 'HR', 'Sales', 'Admin'];
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private restoService: RestoService
  ) {
    this.mainForm();
  }
  ngOnInit() {}
  mainForm() {
    this.restoForm = this.fb.group({
      name: ['', [Validators.required]],
      adresse: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9 ]{12}')]],
    });
  }
  // Choose designation with select dropdown
  /*updateProfile(e) {
    this.restoForm.get('designation').setValue(e, {
      onlySelf: true,
    });
  }*/
 
  // Getter to access form control
  get myForm() {
    return this.restoForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (!this.restoForm.valid) {
      return false;
    } else {
      return this.restoService.createResto(this.restoForm.value).subscribe({
        complete: () => {
          console.log('Restaurant bien cree!'),
            this.ngZone.run(() => this.router.navigateByUrl('/restos-list'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
}