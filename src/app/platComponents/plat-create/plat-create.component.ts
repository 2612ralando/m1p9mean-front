import { Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { PlatService } from '../../service/platService/plat.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-plat-create',
  templateUrl: './plat-create.component.html',
  styleUrls: ['./plat-create.component.css']
})
export class PlatCreateComponent implements OnInit {
  submitted = false;
  platForm: FormGroup;
  PlatProfile: any = ['Plat du jour', 'Entree', 'Snack', 'Fast Food','Pates', 'Soupe','Friture','Dessert'];
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private platService: PlatService
  ) {
    this.mainForm();
  }

  ngOnInit(): void {
  }
  mainForm() {
    this.platForm = this.fb.group({
      nomPlat: ['', [Validators.required]],
      categorie: ['', [Validators.required]],
      details: ['', [Validators.required]],
      prix: ['', [Validators.required]],
    });
  }

  // Choose categorie with select dropdown
  updateProfile(e) {
    this.platForm.get('categorie').setValue(e, {
      onlySelf: true,
    });
  }

  // Getter to access form control
  get myFormPlat() {
    return this.platForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (!this.platForm.valid) {
      return false;
    } else {
      return this.platService.createPlat(this.platForm.value).subscribe({
        complete: () => {
          console.log('Plat bien cree!'),
            this.ngZone.run(() => this.router.navigateByUrl('/plats-list'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
}


