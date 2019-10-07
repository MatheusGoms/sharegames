import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilGamePage } from './perfil-game.page';

describe('PerfilGamePage', () => {
  let component: PerfilGamePage;
  let fixture: ComponentFixture<PerfilGamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilGamePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
