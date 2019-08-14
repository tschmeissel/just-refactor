import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefactorWithChrisPowersComponent } from './refactor-with-chris-powers.component';
import { Paint } from './Paint';


describe('RefactorWithChrisPowersComponent', () => {
  let component: RefactorWithChrisPowersComponent;
  let fixture: ComponentFixture<RefactorWithChrisPowersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefactorWithChrisPowersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefactorWithChrisPowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(true).toBeTruthy();
	expect(Paint).toBeTruthy();
  });
  
  it('Paint should create', () => {
	expect(Paint).toBeTruthy();
  });
});
