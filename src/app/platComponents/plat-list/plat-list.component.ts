import { Component, OnInit } from '@angular/core';
import { PlatService } from '../../service/platService/plat.service';

@Component({
  selector: 'app-plat-list',
  templateUrl: './plat-list.component.html',
  styleUrls: ['./plat-list.component.css']
})
export class PlatListComponent implements OnInit {

  Plat:any = [];
  constructor(private platService: PlatService) { 
    this.readPlat();
  }
  ngOnInit() {}
  readPlat(){
    this.platService.getPlats().subscribe((data) => {
     this.Plat = data;
    })    
  }
  removePlat(plat, index) {
    if(window.confirm('Are you sure?')) {
        this.platService.deletePlat(plat._id).subscribe((data) => {
          this.Plat.splice(index, 1);
        }
      )    
    }
  }

}
