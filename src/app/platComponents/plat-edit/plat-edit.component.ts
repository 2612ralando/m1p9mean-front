import { Plat } from '../../model/plat';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatService } from '../../service/platService/plat.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-plat-edit',
  templateUrl: './plat-edit.component.html',
  styleUrls: ['./plat-edit.component.css'],
})
export class PlatEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  platData: Plat[];
  PlatProfile: any = ['Plat du jour', 'Entree', 'Snack', 'Fast Food', 'Soupe','Friture','Desert'];
  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private platService: PlatService,
    private router: Router
  ) {}
  ngOnInit() {
    this.updatePlat();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getplat(id);
    this.editForm = this.fb.group({
      nomPlat: ['', [Validators.required]],
      categorie: ['', [Validators.required]],
      details: ['', [Validators.required]],
      prix: ['', [Validators.required]],
    });
  }
  // Choose options with select-dropdown
  updateProfile(e) {
    this.editForm.get('categorie').setValue(e, {
      onlySelf: true,
    });
  }
  // Getter to access form control
  get myFormPlat() {
    return this.editForm.controls;
  }
  getplat(id) {
    this.platService.getPlat(id).subscribe((data) => {
      this.editForm.setValue({
        nomPlat: data['nomPlat'],
        categorie: data['categorie'],
        details: data['details'],
        prix: data['prix'],
      });
    });
  }
  updatePlat() {
    this.editForm = this.fb.group({
      nomPlat: ['', [Validators.required]],
      categorie: ['', [Validators.required]],
      details: ['',[Validators.required]],
      prix: ['', [Validators.required]],
    });
  }
  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.platService.updatePlat(id, this.editForm.value).subscribe({
          complete: () => {
            this.router.navigateByUrl('/plats-list');
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