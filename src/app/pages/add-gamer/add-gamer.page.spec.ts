import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGamerPage } from './add-gamer.page';

describe('AddGamerPage', () => {
  let component: AddGamerPage;
  let fixture: ComponentFixture<AddGamerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGamerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGamerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
