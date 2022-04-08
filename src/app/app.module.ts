import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestoCreateComponent } from './components/resto-create/resto-create.component';
import { RestoEditComponent } from './components/resto-edit/resto-edit.component';
import { RestoListComponent } from './components/resto-list/resto-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RestoService } from './service/restoService/resto.service';
import { PlatService } from './service/platService/plat.service';
import { PlatCreateComponent } from './platComponents/plat-create/plat-create.component';
import { PlatEditComponent } from './platComponents/plat-edit/plat-edit.component';
import { PlatListComponent } from './platComponents/plat-list/plat-list.component';

@NgModule({
  declarations: [
    AppComponent,
    RestoCreateComponent,
    RestoEditComponent,
    RestoListComponent,
    PlatCreateComponent,
    PlatEditComponent,
    PlatListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    RestoService,
    PlatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
