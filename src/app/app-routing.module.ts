import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestoCreateComponent } from './components/resto-create/resto-create.component';
import { RestoListComponent } from './components/resto-list/resto-list.component';
import { RestoEditComponent } from './components/resto-edit/resto-edit.component';
import { PlatCreateComponent } from './platComponents/plat-create/plat-create.component';
import { PlatEditComponent } from './platComponents/plat-edit/plat-edit.component';
import { PlatListComponent } from './platComponents/plat-list/plat-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'restos-list' },
  { path: 'create-resto', component: RestoCreateComponent },
  { path: 'edit-resto/:id', component: RestoEditComponent}, 
  { path: 'restos-list', component: RestoListComponent },
  
  { path: '', pathMatch: 'full', redirectTo: 'plats-list' },
  { path: 'create-plat', component: PlatCreateComponent },
  { path: 'edit-plat/:id', component: PlatEditComponent },
  { path: 'plats-list', component: PlatListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
