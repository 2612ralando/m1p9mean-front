import { Component, OnInit } from '@angular/core';
import { PlatService } from '../../service/platService/plat.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Plat } from 'src/app/model/plat';

@Component({
  selector: 'app-plat-list',
  templateUrl: './plat-list.component.html',
  styleUrls: ['./plat-list.component.css']
})
export class PlatListComponent implements OnInit {

  Plat: any = [];
  constructor(private platService: PlatService, private _activatedRoute: ActivatedRoute, private _router: Router) {
    this.readPlat();
  }
  ngOnInit() {
    this.getAllPlatByRestaurant();
   }
  readPlat() {
    this.platService.getPlats().subscribe((data) => {
      this.Plat = data;
    })
  }
  removePlat(plat, index) {
    if (window.confirm('Are you sure?')) {
      this.platService.deletePlat(plat._id).subscribe((data) => {
        this.Plat.splice(index, 1);
      }
      )
    }
  }
  sub: any;
  getAllPlatByRestaurant() {
    // this.sub = this._activatedRoute.paramMap.subscribe((params) => {
    //   const url = '/plats-list/' + params?.get('id');
    //   this._router.navigateByUrl('/', { skipLocationChange: true, }).then(() => { this._router.navigate([url]); });
    // });
    console.log('ID PASSED = ');
    // console.log('ID PASSED = '+ params?.get('id'));


    this.sub = this._activatedRoute.paramMap.subscribe((params) => {
      console.log(params?.get('id'));
      this.platService
        .getPlat(params?.get('id'))
        .subscribe((res) => {
          this.platService.plats = res as Plat[];
          console.log("Liste des plats = " + JSON.stringify(this.platService.plats));
          this.Plat = this.platService.plats;
        });
    });




  }

}
