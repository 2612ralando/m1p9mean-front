import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatEditComponent } from './plat-edit.component';

describe('PlatEditComponent', () => {
  let component: PlatEditComponent;
  let fixture: ComponentFixture<PlatEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
