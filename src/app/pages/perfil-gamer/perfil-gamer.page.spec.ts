import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilGamerPage } from './perfil-gamer.page';

describe('PerfilGamerPage', () => {
  let component: PerfilGamerPage;
  let fixture: ComponentFixture<PerfilGamerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilGamerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilGamerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
