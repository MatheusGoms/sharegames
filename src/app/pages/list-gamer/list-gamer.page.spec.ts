import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGamerPage } from './list-gamer.page';

describe('ListGamerPage', () => {
  let component: ListGamerPage;
  let fixture: ComponentFixture<ListGamerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListGamerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGamerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
