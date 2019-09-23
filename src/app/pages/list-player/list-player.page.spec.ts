import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlayerPage } from './list-player.page';

describe('ListPlayerPage', () => {
  let component: ListPlayerPage;
  let fixture: ComponentFixture<ListPlayerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPlayerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPlayerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
