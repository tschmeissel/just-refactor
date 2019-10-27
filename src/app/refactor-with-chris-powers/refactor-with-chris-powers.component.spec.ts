import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefactorWithChrisPowersComponent } from './refactor-with-chris-powers.component';
import { Paint, PaintStore } from './Paint';


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
	
	localStorage.removeItem("paint");
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(true).toBeTruthy();
	expect(Paint).toBeTruthy();
  });
  
  it('Paint should create', () => {
	expect(Paint).toBeTruthy();
	let paint: Paint = new Paint();
	expect(paint).toBeTruthy();
  });
  
  it('returns an HTML table', () => {
 	let paint: Paint = new Paint(new PaintStore());
	paint.usePaint("blue", 1);
	paint.usePaint("red", 2);
	paint.usePaint("green", 3);
	const expected: string = 
		'<table><thead>' +
		'<tr><th>Color</th><th>Remaining</th></tr></thead><tbody>' +
		'<tr><td>blue</td><td>7</td></tr>' +
		'<tr><td>red</td><td>6</td></tr>' +
		'<tr><td>green</td><td>5</td></tr>' +
		'</tbody></table>'
	expect(paint.generateReport()).toEqual(expected);
  });
});
