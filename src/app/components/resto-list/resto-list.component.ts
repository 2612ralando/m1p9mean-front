import { Component, OnInit } from '@angular/core';
import { RestoService } from '../../service/restoService/resto.service';
import { PlatService } from '../../service/platService/plat.service';
@Component({
  selector: 'app-resto-list',
  templateUrl: './resto-list.component.html',
  styleUrls: ['./resto-list.component.css']
})
export class RestoListComponent implements OnInit {
  
  public Resto:any = [];
  public Plat:any = [];
  constructor(
    private restoService: RestoService,
    private platService : PlatService
    ) { 
    this.readResto();
  }
  ngOnInit() {}
  readResto(){
    this.restoService.getRestoList().subscribe((data) => {
     this.Resto = data;
    })    
  }
  removeResto(resto, index) {
    if(window.confirm('Are you sure?')) {
        this.restoService.deleteResto(resto._id).subscribe((data) => {
          this.Resto.splice(index, 1);
        }
      )    
    }
  }
  findPlatByResto(resto){
    this.platService.getPlat(resto._id).subscribe((data) => {
      this.Plat = data;
     })
     console.log('tonga tompoko')
  
  }
}